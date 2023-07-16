import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { User, IUser, UserLevel } from "@/models/User";
import connectDatabase from "@/controllers/databaseController";

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider ({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ], callbacks: {
        async signIn({ user }) {
            
            await connectDatabase();
            
            let dbUser: IUser = (await User.findOne({ email: user.email })) as IUser;

            if(!dbUser) {
                
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