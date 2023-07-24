import { ParsedCall, ParsedUser, UserLevel } from "@/app/utils/ActionsResponses";
import { getCalls, getUserInfo } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BadgeAlertIcon, LucideRefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CallHistorySkeleton from "./callHistorySkeleton";


export default function CallHistoryWidget() {

    const [calls, setCalls] = useState<ParsedCall[]>([]);
    const [user, setUser] = useState<ParsedUser>();
    const { data: session } = useSession();

    useEffect(() => {
        getUserInfo(`${session?.user?.email}`).then((res) => {
            setUser(res);
        })
    }, []);

    useEffect(() => {
        refreshCalls();
    }, [user]);

    function refreshCalls() {

        if(!(user?.level === "Funcionário"))
            getCalls(`${user?.company}`).then((res) => {
                setCalls(res);
            })
    }

    function showInfo(call: ParsedCall) {
        console.log(call);
    }


    if (calls.length === 0) return <CallHistorySkeleton />

    return (
        <ScrollArea className="border rounded-md w-auto h-80">
            
            <div className="p-4">
                <div className="flex justify-between items-center">
                    
                    <span className="flex space-x-2">
                        <h3 className="text-2xl font-bold">Chamados</h3>
                        <BadgeAlertIcon />
                    
                    </span>
                    
                    <Button variant={"ghost"} onClick={() => refreshCalls()}><LucideRefreshCcw/></Button>
                
                </div>
                
                <div className="p-4 space-y-4">
                    {calls.map((call) => (
                        <React.Fragment key={call.id}>
                            <Separator />
                            <div className="text-sm max-w-xs hover:cursor-pointer hover:animate-pulse" onClick={() => showInfo(call)}>
                                <p className="text-ellipsis overflow-clip">{call.description}</p>
                                <span className="flex space-x-2">
                                    <p className="opacity-75">{call.time}</p>
                                </span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )

}