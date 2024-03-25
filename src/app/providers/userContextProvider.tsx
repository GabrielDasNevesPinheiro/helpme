"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";
import { getUserInfo } from "../actions/userActions";

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
    const [user, setUser] = useState<User>(defaultUser);
    const [connected, setConnected] = useState<boolean>(false);


    useEffect(() => {
        if (session?.user?.email)
            getUserInfo(`${session?.user?.email}`).then((res) => {
                setUser(res);
            });
    }, [session?.user?.email]);
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

