"use server";
import connectDatabase from "@/connections/db";
import { ISector, Sector } from "@/models/Sector";

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
