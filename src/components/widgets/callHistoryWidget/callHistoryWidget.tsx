import { ParsedCall, ParsedUser } from "@/app/utils/ActionsResponses";
import { getCalls, getUserInfo } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BadgeAlertIcon, LucideRefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CallHistorySkeleton from "./callHistorySkeleton";
import { toast } from "@/components/ui/use-toast";
import CallPopover from "./callPopover";
import MotionDiv from "@/components/ui/animation/MotionDiv";


export default function CallHistoryWidget() {

    const [calls, setCalls] = useState<ParsedCall[]>();
    const [user, setUser] = useState<ParsedUser>();
    const { data: session } = useSession();

    useEffect(() => {
        getUserInfo(`${session?.user?.email}`).then((res) => {
            setUser(res);
        })
    }, []);

    useEffect(() => {
        refreshCalls(false);
    }, [user]);

    function refreshCalls(toastEnabled: boolean) {

        if (!(user?.level === "Funcionário"))
            getCalls(`${user?.company}`).then((res) => {
                setCalls(res);

                if (toastEnabled)
                    toast({
                        title: "Atualização efetuada com sucesso!",
                        description: "O Histórico de chamados está atualizado."
                    })
            })

    }

    
    

    if (!calls) return <CallHistorySkeleton />

    return (
        <MotionDiv animation={"fadeIn"}>
        <ScrollArea className="border rounded-md w-auto h-screen">

            <div className="p-4">
                <div className="flex justify-between items-center">

                    <span className="flex space-x-2">
                        <h3 className="text-2xl font-bold">Chamados Recentes</h3>
                        <BadgeAlertIcon />

                    </span>

                    <Button variant={"ghost"} onClick={() => refreshCalls(true)}><LucideRefreshCcw /></Button>

                </div>

                <div className="p-4 space-y-4">
                    {calls.map((call) => (
                        <React.Fragment key={call.id}>
                            <Separator />
                            <CallPopover call={call}/>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </ScrollArea>
        </MotionDiv>
    )

}