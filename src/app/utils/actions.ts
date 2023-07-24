"use server";

import connectDatabase from "@/controllers/databaseController";
import { Company, ICompany } from "@/models/Company";
import { ISector, Sector } from "@/models/Sector";
import { IUser, User } from "@/models/User";
import { ParsedCall, ParsedUser, SetupResponse, UserLevel, UserStatus } from "./ActionsResponses";
import { Call, ICall } from "@/models/Call";


export async function checkUser(email: string): Promise<UserStatus> { // check if user need to complete registration


    try {
        await connectDatabase();

        const user: IUser = (await User.findOne({ email })) as IUser;

        if (!user) return "NOT REGISTERED";
        if (!user?.company) return "NEW USER";

    } catch (error) {
        console.log(error);
    }

    return "REGISTERED"

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
export async function setupUser({ email, sector, company, level }: { email: string, sector: string, company: string, level: number }): Promise<SetupResponse> {


    company = company.toLowerCase();

    try {

        await connectDatabase();

        const user = (await User.findOne({ email })) as IUser;
        const userSector = (await Sector.findOne({ name: sector })) as ISector;
        let userCompany = (await Company.findOne({ name: company })) as ICompany;

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

export async function getUserInfo(email: string): Promise<ParsedUser> {

    const userLevels = {
        0: "Chefe",
        1: "Operador",
        2: "Funcionário",
    }

    try {

        await connectDatabase();
        const user: IUser = (await User.findOne({ email })) as IUser;
        const company: ICompany = (await Company.findOne({ _id: user.company })) as ICompany;
        const sector: ISector = (await Sector.findOne({ _id: user.sector })) as ISector;



        return {
            name: user.name,
            email: user.email,
            company: company.name,
            level: userLevels[user.level as UserLevel],
            sector: sector.name,
        };

    } catch (error) {
        return {
            name: "",
            email: "",
            company: "",
            level: userLevels[2],
            sector: "",
        }
    }

}

export async function makeCall(description: string, userInfo: ParsedUser): Promise<boolean> {

    try {

        await connectDatabase();
        const user: IUser = (await User.findOne({ email: userInfo.email })) as IUser;
        const sector: ISector = (await Sector.findOne({ name: userInfo.sector })) as ISector;
        const company: ICompany = (await Company.findOne({ name: userInfo.company.toLowerCase() })) as ICompany;

        if (user.level === UserLevel.OPERATOR) return false;
        if (!user) return false;
        if (!sector) return false;
        if (!company) return false;

        const call = new Call({
            user: user._id,
            sector: sector._id,
            company: company._id,
            description,
            status: true, // true = chamado ainda em aberto / false = chamado fechado  (resolvido).

        });

        await call.save();

        return true;


    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCalls(companyName: string): Promise<ParsedCall[]> {

    let parsedCalls: ParsedCall[] = []

    try {
        await connectDatabase();

        const company: ICompany = (await Company.findOne({ name: companyName })) as ICompany;
        const calls: ICall[] = (await Call.find({ company })) as ICall[];
        for (const call of calls) {

            const user: IUser = (await User.findOne({ _id: call.user })) as IUser;
            const sector: ISector = (await Sector.findOne({ _id: call.sector })) as ISector;

            const timeResult = getTimeDiff(call.createdAt);

            parsedCalls.unshift({
                id: call._id.toString(),
                user: user.name,
                description: call.description,
                sector: sector.name,
                status: call.status,
                time: timeResult,

            })
        }
        
        return parsedCalls;

    } catch {

        return [];

    }

}



function getTimeDiff(time: Date): string {

    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000); // Difference in seconds

    // Difference between call createdAt and date.now
    let timeResult: string;

    if (differenceInSeconds < 60) { // if created seconds ago

        timeResult = `há ${differenceInSeconds} segundo${differenceInSeconds !== 1 ? 's' : ''}`;

    } else if (differenceInSeconds < 3600) { // if created minutes ago

        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        timeResult = `há ${differenceInMinutes} minuto${differenceInMinutes !== 1 ? 's' : ''}`;

    } else if (differenceInSeconds < 86400) { // if created hours ago

        const differenceInHours = Math.floor(differenceInSeconds / 3600);
        timeResult = `há ${differenceInHours} hora${differenceInHours !== 1 ? 's' : ''}`;

    } else {

        const differenceInDays = Math.floor(differenceInSeconds / 86400); // if created days ago
        timeResult = `há ${differenceInDays} dia${differenceInDays !== 1 ? 's' : ''}`;

    }

    return timeResult;
}