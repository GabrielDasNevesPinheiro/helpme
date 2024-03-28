import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CallForm from "./CallForm";

export default function CallWidget() {

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