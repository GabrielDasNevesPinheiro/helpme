"use server";

import { Company } from "@/models/Company";
import { User } from "@/models/User";
import crypto from "crypto";

function generateCode(): string {
    const code = crypto.createHash("MD5").update(String(Date.now())).digest("hex");
    return code.slice(0, 6);
}

export async function createCompany(name: string, ownerEmail: string): Promise<boolean> {
    try {

        const code = generateCode();
        const owner = await User.findOne({ email: ownerEmail });

        const company = await Company.create({
            owner: owner?._id,
            code,
            name
        });

        await User.updateOne({ _id: owner?._id }, {
            $set: {
                level: 0,
                company: company._id,
                sector: "Presidência"
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}