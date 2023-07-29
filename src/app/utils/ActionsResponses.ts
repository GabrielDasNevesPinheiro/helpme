
export type UserStatus = "NEW USER" | "REGISTERED" | "NOT REGISTERED"; // possible return values to account check


export type SetupResponse = "COMPANY HAS OWNER" | "NO COMPANY" | "SUCCESS" | "ERROR"; // possible return values on account setup

// Parsed interface must be used as response types for front-end
export interface ParsedUser {
    name: string,
    email: string
    level: string
    company: string
    sector: string
}

export interface ParsedCall {
    id: string
    user: string
    sector: string
    description: string
    status: boolean
    time: string
    datetime: string

}

export enum UserLevel {
    BOSS = 0,
    OPERATOR = 1,
    EMPLOYEE = 2,
}
