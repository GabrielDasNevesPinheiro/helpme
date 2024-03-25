import { GaugeIcon } from "lucide-react";
import ThemeButton from "../ui/theme-button";
import { Button } from "../ui/button";
import { Label } from "../ui/label";


export default function AppBar() {


    return (
        <header className="flex p-4 text-4xl justify-between border-b">
            <p className="flex flex-col items-center">
                <Label className="text-4xl"><a href="/">Helpme</a></Label>
            </p>
            <div>
                <Button variant={"link"} className="space-x-2">
                    <GaugeIcon />
                    <p>Dashboard</p>
                </Button>
            </div>
        </header>
    )
}