import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { User } from "@/models/User";
import connectDatabase from "@/connections/db";
import { UserLevel } from "@/types/userlevel";
import mongoose from "mongoose";

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ], callbacks: {
        async signIn({ user }) {
            console.log(user);
            await connectDatabase();

            let dbUser: UserSchemaType<mongoose.Document> = (await User.findOne({ email: user.email }))!;

            if (!dbUser) {

                dbUser = new User({
                    name: user?.name as string,
                    email: user?.email as string,
                    level: UserLevel.EMPLOYEE
                });

                await dbUser?.save();
            }
            return true;

        },

    }

}