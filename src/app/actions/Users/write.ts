"use server";

import connectDatabase from "@/connections/db";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import { Document } from "mongoose";


export async function setupUser({ email, sector, code, level }: { email: string, sector: string, code: string, level: string }): Promise<SetupResponse> {
    try {

        await connectDatabase();
        const user = (await User.findOne({ email })) as UserSchemaType<Document>;
        let userCompany = (await Company.findOne({ code })) as CompanySchemaType<Document>;

        user.level = Number(level);
        user.sector = sector;

        if (!userCompany?._id) return "NO COMPANY";

        if (userCompany?._id) {
            user.company = userCompany._id;
        }

        await User.updateOne({ email }, user);
        return "SUCCESS";

    } catch (error) {
        return "ERROR";
    }

}