import { GaugeIcon, HandIcon, Home } from "lucide-react";
import ThemeButton from "../ui/theme-button";
import { Button } from "../ui/button";


export default function AppBar() {


    return (
        <header className="flex p-4 text-4xl justify-between border-b">

            <div>
                <Button variant={"link"} className="space-x-2">
                    <GaugeIcon />
                    <p>Dashboard</p>
                </Button>
            </div>
            

            <div className="flex space-x-4 items-center">

                <ThemeButton size={28} />
            </div>
        </header>
    )
}