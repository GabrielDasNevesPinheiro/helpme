
export type UserStatus = "NEW USER" | "REGISTERED" | "NOT REGISTERED"; // possible return values to account check


export type SetupResponse = "COMPANY HAS OWNER" | "NO COMPANY" | "SUCCESS" | "ERROR"; // possible return values on account setup

export interface ParsedUser {
    name: string,
    email: string,
    level: string,
    company: string,
    sector: string,
}

export enum UserLevel {
    BOSS = 0,
    OPERATOR = 1,
    EMPLOYEE = 2,
}
