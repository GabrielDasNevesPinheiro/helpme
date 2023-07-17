import { HandIcon } from "lucide-react";
import { useSession } from "next-auth/react"
import Image from "next/image";
import ThemeButton from "../theme-button";

export default function AppBar() {

    const { data: session, status } = useSession();

    return (
        <header className="flex p-4 bg-secondary w-screen text-4xl justify-between">
            
            <div className="flex space-x-2 items-center">
                <h1>Bem vindo(a)</h1>
                <HandIcon size={35}/>
            </div>

            <div className="flex space-x-4 items-center">
            
            <ThemeButton size={28}/>

        
            
            </div>            
        </header>
    )
}