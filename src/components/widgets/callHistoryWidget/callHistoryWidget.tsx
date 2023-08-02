import { ParsedCall, ParsedUser } from "@/app/utils/ActionsResponses";
import { closeCall, getCalls, getUserInfo } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BadgeAlertIcon, CheckCircle, CheckIcon, HelpCircle, KanbanSquareIcon, LucideRefreshCcw, UserIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CallHistorySkeleton from "./callHistorySkeleton";
import { toast } from "@/components/ui/use-toast";
import CallPopover from "./callPopover";
import { motion } from "framer-motion";
import MotionDiv from "@/components/ui/animation/MotionDiv";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


export default function CallHistoryWidget() {

    const [calls, setCalls] = useState<ParsedCall[]>();
    const [user, setUser] = useState<ParsedUser>();
    const [done, setDone] = useState(false);
    const { data: session } = useSession();


    useEffect(() => {
        getUserInfo(`${session?.user?.email}`).then((res) => {
            setUser(res);
        })
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
    function killCall(call: ParsedCall) {
        closeCall(call.id).then((success) => {
            if (success) {
                toast({
                    title: "Chamado finalizado com êxito",
                })
            } else {
                toast({
                    title: "Erro ao finalizar chamado",
                    description: "Tente novamente.",
                    variant: "destructive",
                })
            }
        })
        setDone(true);
        call.status = false;
    }
    console.log(calls);


    if (!calls?.length) return <CallHistorySkeleton />

    return (
        <MotionDiv animation={"fadeIn"}>
            <ScrollArea className="border rounded-md w-auto h-screen">

                <div className="p-4">
                    <div className="flex justify-between items-center">

                        <span className="flex space-x-2">
                            <h3 className="text-2xl font-bold">Chamados</h3>
                            <BadgeAlertIcon />

                        </span>

                        <Button variant={"ghost"} onClick={() => refreshCalls(true)}><LucideRefreshCcw /></Button>

                    </div>

                    <div className="p-4 space-y-4">
                        {calls.map((call) => (
                            <React.Fragment key={call.id}>
                                <Separator />
                                <Popover>
                                    <PopoverTrigger>
                                        <div className={`text-sm w-auto hover:cursor-pointer`}>
                                            <p className="text-ellipsis w-96 overflow-clip text-start">{call.description}</p>
                                            <span className="flex space-x-2 items-center opacity-75">
                                                <p>{call.time}</p>
                                                {call.status ? <XIcon className="text-red-400" size={14} /> : <CheckIcon className="text-green-400" size={14} />}
                                            </span>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex flex-col space-y-2 p-4">
                                            <span className="flex space-x-2">
                                                <UserIcon />
                                                <p>{call.user}</p>
                                            </span>
                                            <span className="flex space-x-2">
                                                <KanbanSquareIcon />
                                                <p>{call.sector}</p>
                                            </span>
                                            <span className="flex space-x-2">
                                                <HelpCircle />
                                                <p className={call.status ? "text-red-500" : "text-green-500"}>
                                                    {call.status ? "Aberto" : "Resolvido"}
                                                </p>
                                            </span>
                                            <span className="flex space-x-2 text-center overflow-clip break-all max-w-full p-4">
                                                <p className="">{call.description}</p>
                                            </span>
                                            <span className="flex space-x-2 text-sm opacity-70 self-end">
                                                <p >{call.datetime}</p>
                                            </span>
                                        </div>
                                        <Button className="space-x-2 w-full" onClick={() => killCall(call)} disabled={!call.status || done}>
                                            <CheckCircle />
                                            <p>Finalizar</p>
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </MotionDiv>
    )

}