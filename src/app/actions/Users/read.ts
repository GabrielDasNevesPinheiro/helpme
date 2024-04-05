"use server";

import connectDatabase from "@/connections/db";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import { UserLevel } from "@/types/userlevel";
import { Document } from "mongoose";

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

export async function getUserInfo(email: string): Promise<User> {

    try {

        await connectDatabase();
        const user: UserSchemaType<Document> = (await User.findOne({ email }))!;
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

export async function getUsers(email: string): Promise<UserSchemaType[]> {
    try {
        await connectDatabase();

        const { company } = await User.findOne({ email }) as UserSchemaType;
        const users = await User.find({ company });

        return users;

    } catch {
        return [];
    }
}

export async function getUserCount(email: string): Promise<{ employees: number, operators: number }> {
    const users = await getUsers(email);

    const employees = users.filter((user) => user.level == 2).length;
    const operators = users.filter((user) => user.level == 1).length;

    return { employees, operators };
}