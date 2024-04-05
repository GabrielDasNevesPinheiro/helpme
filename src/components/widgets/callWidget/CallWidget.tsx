import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CallForm from "./CallForm";
import { getServerSession } from "next-auth";
import { getUserInfo } from "@/app/actions/Users/read";

export default async function CallWidget() {
    const session = await getServerSession();
    const info = await getUserInfo(session!.user!.email!);

    if (info.level === "Operador") return <></>;

    return (
        <div className="flex flex-col items-center justify-center text-2xl pt-12">
            <h1 className="text-3xl">Precisando de ajuda?</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"link"} className="text-xl">🛠️ Contatar Técnicos</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar um novo chamado</DialogTitle>
                        <DialogDescription>Envie um chamado direto para os Operadores</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col w-full">
                        <CallForm />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}