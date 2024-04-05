"use server";

import connectDatabase from "@/connections/db";
import { socket } from "@/connections/socket";
import { Call } from "@/models/Call";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import { UserLevel } from "@/types/userlevel";
import { Document, Types } from "mongoose";

export async function makeCall(description: string, userInfo: User): Promise<boolean> {

    try {

        await connectDatabase();
        const user = (await User.findOne({ email: userInfo.email }))!;
        const company = (await Company.findOne({ _id: user.company }))!;

        if (!user || user.level === UserLevel.OPERATOR || !user.sector || !company) return false;

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

export async function closeCall(callID: string, userID: string): Promise<boolean> {

    try {

        await connectDatabase();
        const call = (await Call.findOne({ _id: callID })) as CallSchemaType<Document>;

        if (call.closedBy) return false;

        call.status = false;
        call.closedBy = new Types.ObjectId(userID);

        await call.save();

        return true;

    } catch (error) {
        return false;
    }

}