"use server";

import connectDatabase from "@/controllers/databaseController";
import { IUser, User } from "@/models/User";

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