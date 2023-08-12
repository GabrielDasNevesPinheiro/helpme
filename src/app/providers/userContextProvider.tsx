"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../utils/actions";
import { ParsedUser } from "../utils/ActionsResponses";
import { useSession } from "next-auth/react";


interface ProviderProps {
    children: React.ReactNode;
}

type UserContext = {
    user: ParsedUser
}

const defaultUser = { 
    company: "", 
    email: "", 
    id: "", 
    level: "", 
    name: "", 
    sector: "" 
}

export const UserContext = createContext<UserContext>({ user: defaultUser });

export default function UserContextProvider({ children }: ProviderProps) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<ParsedUser>(defaultUser);

    if (status === "loading") return <></>

    if (user.name === ""){
        getUserInfo(`${session?.user?.email}`).then((res) => setUser(res));
    }
    
    

    return (
        <UserContext.Provider
            value={{
                user
            }}>
            {children}
        </UserContext.Provider>
    )

}

export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}