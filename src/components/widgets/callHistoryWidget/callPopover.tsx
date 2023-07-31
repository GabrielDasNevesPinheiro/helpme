import { ParsedCall } from "@/app/utils/ActionsResponses";
import { closeCall } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, CheckIcon, HelpCircle, KanbanSquareIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    call: ParsedCall
}

export default function CallPopover({ call }: Props) {
    const [done, setDone] = useState(false);

    function killCall(callID: string) {
        closeCall(callID).then((success) => {
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

    return (
        <Popover>
            <PopoverTrigger>
                <div className={`text-sm w-auto hover:cursor-pointer`}>
                    <p className="text-ellipsis w-96 overflow-clip text-start">{call.description}</p>
                    <span className="flex space-x-2 items-center opacity-75">
                        <p>{call.time}</p>
                        { call.status ? <XIcon className="text-red-400" size={14}/> : <CheckIcon className="text-green-400" size={14}/>}
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
                <Button className="space-x-2 w-full" onClick={() => killCall(call.id)} disabled={!call.status || done}>
                    <CheckCircle />
                    <p>Finalizar</p>
                </Button>
            </PopoverContent>
        </Popover>
    )
}