import connectDatabase from "@/controllers/databaseController";
import { IUser, User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: {
        email: string;
    };
}

export async function GET(req: NextRequest, { params }: Params) { // use it to check if user need to setup account

    await connectDatabase();

    try {
        
        const user: IUser | null = await User.findOne({ email: params.email });
        
        if(!user?.company) return NextResponse.json( { message: "NEW USER" }, { status: 200 });

        return NextResponse.json({ message: "REGISTERED" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error on searching user" }, { status: 200 });
    }

}