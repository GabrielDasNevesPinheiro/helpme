"use server";

import connectDatabase from "@/connections/db";
import { createEmptyCall, getFormattedDate, getTimeDiff } from "@/lib/utils";
import { Call } from "@/models/Call";
import { Company } from "@/models/Company";
import { User } from "@/models/User";

export async function getCalls(email: string): Promise<Call[]> {

    let parsedCalls: Call[] = [];

    try {
        await connectDatabase();

        const { company } = await User.findOne({ email }) as UserSchemaType;
        const { _id: companyId } = (await Company.findOne({ _id: company })) as CompanySchemaType;
        const calls: CallSchemaType[] = (await Call.find({ company: companyId }));


        parsedCalls = await Promise.all(calls.reverse().slice(0, 15).map(async (call) => {
            const { name: userName } = (await User.findOne({ _id: call.user })) as User;
            const { name: operatorName } = (await User.findOne({ _id: call.closedBy })) as User || { name: "" };
            const timeResult = getTimeDiff(call.createdAt);

            return {
                id: call._id.toString(),
                user: userName,
                description: call.description,
                sector: call.sector,
                status: call.status,
                closedBy: operatorName,
                time: timeResult,
                datetime: getFormattedDate(call.createdAt),

            }
        }));

        return parsedCalls;

    } catch (error) {
        console.log("ERRO ", error)
        return [];

    }

}

export async function getCall(callID: string): Promise<Call> {


    try {
        await connectDatabase();
        const callQuery: CallSchemaType = (await Call.findOne({ _id: callID })) as CallSchemaType;

        const call = await parseCall(callQuery);

        return call;


    } catch (error) {
        console.log(error);
        return createEmptyCall();
    }
}

export async function getRecentCalls(email: string): Promise<Call[]> {

    const user = await User.findOne({ email });

    try {
        const query = await Call.find({
            company: user?.company,
            status: true
        }).sort({ createdAt: -1 }).limit(10);

        const calls: Call[] = await Promise.all(query.map(async (call) => await parseCall(call)));
        return calls;

    } catch (error) {
        console.log(error);
        return [];
    }

}

async function parseCall(callQuery: CallSchemaType) {

    let call: Call = createEmptyCall();

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
}