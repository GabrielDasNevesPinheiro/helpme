"use server";

import axios, { AxiosError } from "axios";

export async function checkUser(email: string) { // check if user need to complete registration

    interface UserStatus {
        message: "NEW USER" | "REGISTERED" | "NOT REGISTERED";
    }

    try {

        const res: UserStatus = await (await axios.get(`http://localhost:3000/api/user/${email}`)).data;
        return res;

    } catch(error) {

        const parsedError = error as AxiosError;
        console.log(parsedError.message);
        
    }

    

  }