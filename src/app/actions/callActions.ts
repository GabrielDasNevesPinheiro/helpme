"use server";

import connectDatabase from "@/connections/db";
import { socket } from "@/connections/socket";
import { Call, ICall } from "@/models/Call";
import { Company, ICompany } from "@/models/Company";
import { ISector, Sector } from "@/models/Sector";
import { IUser, User } from "@/models/User";
import { Types } from "mongoose";

export async function makeCall(description: string, userInfo: ParsedUser): Promise<boolean> {

    try {

        await connectDatabase();
        const user: IUser = (await User.findOne({ email: userInfo.email })) as IUser;
        const sector: ISector = (await Sector.findOne({ name: userInfo.sector })) as ISector;
        const company: ICompany = (await Company.findOne({ name: userInfo.company.toLowerCase() })) as ICompany;

        if (user.level === UserLevel.OPERATOR) return false;
        if (!user) return false;
        if (!sector) return false;
        if (!company) return false;

        const call = new Call({
            user: user._id,
            sector: sector._id,
            company: company._id,
            description,
            status: true, // true = chamado ainda em aberto / false = chamado fechado  (resolvido).

        });

        await call.save();

        socket.emit("sendCallAlert", call._id.toString(), company.name);


        return true;


    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCalls(companyName: string): Promise<ParsedCall[]> {

    let parsedCalls: ParsedCall[] = [];

    try {
        await connectDatabase();

        const { _id: companyId } = (await Company.findOne({ name: companyName })) as ICompany;
        const calls: ICall[] = (await Call.find({ company: companyId })) as ICall[];

        for (const call of calls.reverse().slice(0, 15)) {

            const { name: userName } = (await User.findOne({ _id: call.user })) as IUser;
            const { name: operatorName } = (await User.findOne({ _id: call.closedBy })) as IUser || { name: "" };
            const { name: sectorName } = (await Sector.findOne({ _id: call.sector })) as ISector;

            const timeResult = getTimeDiff(call.createdAt);

            parsedCalls.push({
                id: call._id.toString(),
                user: userName,
                description: call.description,
                sector: sectorName,
                status: call.status,
                closedBy: operatorName,
                time: timeResult,
                datetime: getFormattedDate(call.createdAt),

            })
        }

        return parsedCalls;

    } catch (error) {
        console.log("ERRO ", error)
        return [];

    }

}

export async function getCall(callID: string): Promise<ParsedCall> {

    let call: ParsedCall = {
        id: "",
        user: "",
        description: "",
        sector: "",
        status: false,
        closedBy: "",
        time: "",
        datetime: "",
    };

    try {
        await connectDatabase();
        const callQuery: ICall = (await Call.findOne({ _id: callID })) as ICall;
        const user: IUser = (await User.findOne({ _id: callQuery.user })) as IUser;
        const sector: ISector = (await Sector.findOne({ _id: callQuery.sector })) as ISector;

        call.id = callQuery._id.toString();
        call.user = user.name;
        call.description = callQuery.description;
        call.status = callQuery.status;
        call.closedBy = callQuery.closedBy ? callQuery.closedBy.toString() : "";
        call.sector = sector.name;
        call.time = getTimeDiff(callQuery.createdAt);
        call.datetime = getFormattedDate(callQuery.createdAt);

        return call;


    } catch (error) {
        console.log(error);
        return call;
    }
}

export async function closeCall(callID: string, userID: string): Promise<boolean> {

    try {

        await connectDatabase();
        const call = (await Call.findOne({ _id: callID })) as ICall;

        if (call.closedBy) return false;

        call.status = false;
        call.closedBy = new Types.ObjectId(userID);

        await call.save();

        return true;

    } catch (error) {
        return false;
    }

}


function getTimeDiff(time: Date): string {

    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000); // Difference in seconds

    // Difference between call createdAt and date.now
    let timeResult: string;

    if (differenceInSeconds < 60) { // if created seconds ago

        timeResult = `há ${differenceInSeconds} segundo${differenceInSeconds !== 1 ? 's' : ''}`;

    } else if (differenceInSeconds < 3600) { // if created minutes ago

        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        timeResult = `há ${differenceInMinutes} minuto${differenceInMinutes !== 1 ? 's' : ''}`;

    } else if (differenceInSeconds < 86400) { // if created hours ago

        const differenceInHours = Math.floor(differenceInSeconds / 3600);
        timeResult = `há ${differenceInHours} hora${differenceInHours !== 1 ? 's' : ''}`;

    } else {

        const differenceInDays = Math.floor(differenceInSeconds / 86400); // if created days ago
        timeResult = `há ${differenceInDays} dia${differenceInDays !== 1 ? 's' : ''}`;

    }

    return timeResult;
}

function getFormattedDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}`
}