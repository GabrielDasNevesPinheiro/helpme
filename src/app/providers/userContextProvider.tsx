"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";
import { getUserInfo } from "../actions/user.actions";

interface ProviderProps {
    children: React.ReactNode;
}

const defaultUser: User = {
    company: "",
    email: "",
    id: "",
    level: "",
    name: "",
    sector: ""
}

export default function UserContextProvider({ children }: ProviderProps) {

    const { data: session } = useSession();
    const [user, setUser] = useState<User>(defaultUser);
    const [image, setImage] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);


    useEffect(() => {
        const fetchUserInfo = async () => {
            if (session?.user?.email) {
                try {
                    const userInfo = await getUserInfo(session.user.email);
                    setUser(userInfo);
                    setImage(session.user.image!);

                } catch (error) {

                }
            }
        };

        fetchUserInfo();

    }, [session?.user?.email]);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                connected,
                setConnected,
                image
            }}>
            {children}
        </UserContext.Provider>
    )

}

