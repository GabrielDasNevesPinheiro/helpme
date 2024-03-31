import { GaugeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";


export default function AppBar({ dashboard = true }: { dashboard?: boolean }) {


    return (
        <header className="flex p-4 text-4xl justify-between border-b">
            <p className="flex flex-col items-center">
                <Label className="text-4xl"><a href="/">Helpme</a></Label>
            </p>
            <div>{dashboard &&
                <div className="flex items-center h-full space-x-2 text-base">
                    <GaugeIcon />
                    <a href="/dashboard">Dashboard</a>
                </div>
            }</div>
        </header>
    )
}