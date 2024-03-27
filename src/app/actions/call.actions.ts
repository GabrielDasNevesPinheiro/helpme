"use server";

import connectDatabase from "@/connections/db";
import { socket } from "@/connections/socket";
import { Call } from "@/models/Call";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import { UserLevel } from "@/types/userlevel";
import mongoose from "mongoose";
import { Types } from "mongoose";

export async function makeCall(description: string, userInfo: User): Promise<boolean> {

    try {

        await connectDatabase();
        const user: UserSchemaType<mongoose.Document> = (await User.findOne({ email: userInfo.email }))!;
        const company: CompanySchemaType<Document> = (await Company.findOne({ name: userInfo.company.toLowerCase() }))!;

        if (user.level === UserLevel.OPERATOR) return false;
        if (!user) return false;
        if (!user?.sector) return false;
        if (!company) return false;

        const call = new Call({
            user: user._id,
            sector: user.sector,
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

export async function getCalls(companyName: string): Promise<Call[]> {

    let parsedCalls: Call[] = [];

    try {
        await connectDatabase();

        const { _id: companyId } = (await Company.findOne({ name: companyName })) as CompanySchemaType;
        const calls: CallSchemaType[] = (await Call.find({ company: companyId }));

        for (const call of calls.reverse().slice(0, 15)) {

            const { name: userName } = (await User.findOne({ _id: call.user })) as User;
            const { name: operatorName } = (await User.findOne({ _id: call.closedBy })) as User || { name: "" };

            const timeResult = getTimeDiff(call.createdAt);

            parsedCalls.push({
                id: call._id.toString(),
                user: userName,
                description: call.description,
                sector: call.sector,
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

export async function getCall(callID: string): Promise<Call> {

    let call: Call = {
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
        const callQuery: CallSchemaType = (await Call.findOne({ _id: callID })) as CallSchemaType;
        const user: User = (await User.findOne({ _id: callQuery.user }))!;

        call.id = callQuery._id.toString();
        call.user = user.name;
        call.description = callQuery.description;
        call.status = callQuery.status;
        call.closedBy = callQuery.closedBy ? callQuery.closedBy.toString() : "";
        call.sector = callQuery.sector;
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
        const call = (await Call.findOne({ _id: callID })) as CallSchemaType<mongoose.Document>;

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