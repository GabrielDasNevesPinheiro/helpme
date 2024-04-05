"use server";

import { Company } from "@/models/Company";
import { User } from "@/models/User";

export async function getCompany(email: string): Promise<Company> {

    const { company: companyId } = await User.findOne({ email }) as UserSchemaType;
    const company = await Company.findOne({ _id: companyId }) as CompanySchemaType;

    return company;

}