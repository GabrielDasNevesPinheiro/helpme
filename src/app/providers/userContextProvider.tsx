"use client";

import { useState } from "react";
import { getUserInfo } from "../utils/actions";
import { ParsedUser } from "../utils/ActionsResponses";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";

interface ProviderProps {
    children: React.ReactNode;
}

const defaultUser = { 
    company: "", 
    email: "", 
    id: "", 
    level: "", 
    name: "", 
    sector: "" 
}

export default function UserContextProvider({ children }: ProviderProps) {

    const { data: session, status } = useSession();
    const [user, setUser] = useState<ParsedUser>(defaultUser);
    const [connected, setConnected] = useState<boolean>(false);

    if (status === "loading") return <></>

    if (user.name === ""){
        getUserInfo(`${session?.user?.email}`).then((res) => setUser(res));
    }

    return (
        <UserContext.Provider
            value={{
                user,
                connected,
                setConnected
            }}>
            {children}
        </UserContext.Provider>
    )

}

