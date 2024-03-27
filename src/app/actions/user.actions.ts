"use server";

import connectDatabase from "@/connections/db";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import { UserLevel } from "@/types/userlevel";
import mongoose from "mongoose";

const userLevels = {
    0: "Chefe",
    1: "Operador",
    2: "Funcionário",
}

export async function checkUser(email: string): Promise<UserStatus> { // check if user need to complete registration
    try {
        await connectDatabase();

        const user: User = (await User.findOne({ email }))!;

        if (!user) return "NOT REGISTERED";
        if (!user?.company) return "NEW USER";

    } catch (error) {
        console.log(error);
    }

    return "REGISTERED"

}

// this function must be used when setup a new account
export async function setupUser({ email, sector, company, level }: { email: string, sector: string, company: string, level: 0 | 1 | 2 }): Promise<SetupResponse> {


    company = company.toLowerCase();

    try {

        await connectDatabase();

        const user = (await User.findOne({ email })) as UserSchemaType<mongoose.Document>;
        let userCompany = (await Company.findOne({ name: company })) as CompanySchemaType<mongoose.Document>;

        user.level = level;
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


export async function getUserInfo(email: string): Promise<User> {

    try {

        await connectDatabase();
        const user: UserSchemaType<mongoose.Document> = (await User.findOne({ email }))!;
        const { name: companyName } = (await Company.findOne({ _id: user?.company })) as CompanySchemaType || { name: "" };

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            company: companyName,
            level: userLevels[user.level as UserLevel],
            sector: user?.sector ?? "",
        };

    } catch (error) {
        console.log(error)
        return {
            id: "",
            name: "",
            email: "",
            company: "",
            level: userLevels[2],
            sector: "",
        }
    }

}