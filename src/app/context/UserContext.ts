import { createContext, useContext } from "react";

type UserContextType = {
    user: ParsedUser
    connected: boolean
    setConnected: (value: boolean) => void
}

const defaultUser = {
    company: "",
    email: "",
    id: "",
    level: "",
    name: "",
    sector: ""
}


export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    connected: false, setConnected: (value: boolean) => { }
});


export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}