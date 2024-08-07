import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { User } from "@/models/User";
import connectDatabase from "@/connections/db";

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
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async signIn({ user }) {

            await connectDatabase();

            let dbUser: UserSchemaType = (await User.findOne({ email: user.email }))!;

            if (!dbUser) {
                await User.create({
                    name: user.name,
                    level: 2,
                    email: user.email
                });
                this.redirect!({ baseUrl: `${process.env.NEXTAUTH_URL}`, url: "/setup" });
            }


            return true;

        },
    }

}