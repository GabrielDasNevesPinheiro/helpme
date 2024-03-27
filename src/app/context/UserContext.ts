import { createContext, useContext } from "react";

type UserContextType = {
    user: User
    connected: boolean
    setConnected: (value: boolean) => void
    setUser: (value: User) => void
    image: string
}

const defaultUser = {
    company: "",
    email: "",
    id: "",
    level: "",
    name: "",
    sector: ""
}
const defaultImage = "";


export const UserContext = createContext<UserContextType>({
    user: defaultUser, setUser: (value: User) => { },
    image: defaultImage,
    connected: false, setConnected: (value: boolean) => { }
});


export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}