"use server";

import connectDatabase from "@/connections/db";
import { Company } from "@/models/Company";
import { Sector } from "@/models/Sector";
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
        const userSector = (await Sector.findOne({ name: sector })) as Sector;
        let userCompany = (await Company.findOne({ name: company })) as CompanySchemaType<mongoose.Document>;

        user.level = level;
        user.sector = userSector._id;

        // Bosses cannot be owner of another companies.
        if (userCompany?._id && user.level == 0) return "COMPANY HAS OWNER";

        // user levels [0 = BOSS, 1 = TI Support, 2 = Empolyee]
        if (!userCompany?._id && user.level == 0) { // if company doesnt exists and user level is BOSS level it will create a new company

            userCompany = new Company({ name: company });
            userCompany.owner = user._id;
            await userCompany.save();

            user.company = userCompany._id;
        }

        if (!userCompany?._id && (user.level as number) > 0) return "NO COMPANY";

        if (userCompany?._id && (user.level as number) > 0) { // if company exists and user level is not BOSS level, then this user assign to company
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
        const { name: sectorName } = (await Sector.findOne({ _id: user?.sector })) as Sector || { name: "" };

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            company: companyName,
            level: userLevels[user.level as UserLevel],
            sector: sectorName,
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