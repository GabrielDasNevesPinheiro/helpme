import { getRecentCalls } from "@/app/actions/call.actions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import CallPopover from "./callPopover";
import { getUserInfo } from "@/app/actions/user.actions";

export default async function CallHistoryWidget() {
    const session = await getServerSession();
    const calls = await getRecentCalls(session!.user!.email!);
    const { id, level } = await getUserInfo(session!.user!.email!);

    if (level !== "Operador") return <></>;

    return (
        <div className="self-center m-4 text-center">
            <h1 className="text-xl">Chamados recentes</h1>
            <ScrollArea className="max-w-3xl border-t p-6">
                {calls.length == 0 &&
                    <div className="flex items-center justify-center w-full">
                        <h1 className="text-2xl text-primary/70 animate-pulse"> Nenhum chamado pendente</h1>
                    </div>
                }
                <div className="flex flex-col md:flex-row max-h-72  w-full items-center gap-2">
                    {calls.map((call) => (
                        <div key={call.id} className="flex border p-2 rounded-md">
                            <CallPopover call={call} userID={id} />
                        </div>
                    ))}

                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )

}