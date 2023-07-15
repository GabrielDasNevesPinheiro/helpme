"use server";

import connectDatabase from "@/controllers/databaseController";
import { Company, ICompany } from "@/models/Company";
import { ISector, Sector } from "@/models/Sector";
import { IUser, User } from "@/models/User";
import { ObjectId } from "mongoose";

interface UserStatus {
    message: "NEW USER" | "REGISTERED" | "NOT REGISTERED";
}

export async function checkUser(email: string): Promise<UserStatus> { // check if user need to complete registration


    try {
        await connectDatabase();

        const user: IUser | null = await User.findOne({ email });

        if (!user) return { message: "NOT REGISTERED" };
        if (!user?.company) return { message: "NEW USER" };

    } catch (error) {
        console.log(error);
    }

    return { message: "REGISTERED" }

}

export async function getSectors(): Promise<string[]> {

    const sectorList: string[] = [];

    try {
        
        await connectDatabase();

        const sectors: ISector[] = await Sector.find();

        sectors.map((sector) => {
            sectorList.push(sector.name);
        });

    } catch (error) {
        console.log(error);        
    }

    return sectorList;

}

// this function must be used when setup a new account
export async function setupUser({email, sector, company, level}: { email: string, sector: string, company: string, level: number}) {

    try {
        
        await connectDatabase();

        const user = (await User.findOne({ email })) as IUser;
        const userSector = (await Sector.findOne({ name: sector })) as ISector;
        let userCompany = (await Company.findOne({ name: company })) as ICompany;
        
        user.level = level;
        user.sector = userSector._id;

        if(!userCompany) {

            if (user.level != 0) {
                return "NO COMPANY";
            }

            userCompany = new Company({ name: company});
            userCompany.owner = user._id;
            await userCompany.save();

            user.company = userCompany._id;

        } else {

            if (user.level == 0) return "COMPANY HAS OWNER";

        }

        await User.updateOne({ email }, user);

        return "SUCCESS";
        

    } catch (error) {
        return "ERROR";
    }

}