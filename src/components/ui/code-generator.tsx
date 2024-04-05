"use client";

import { setCompanyCode } from "@/app/actions/Company/write";
import { Button } from "./button";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

export default function CodeGenerator({ email }: { email: string }) {
    const router = useRouter();

    const setNewCode = async () => {
        const res = await setCompanyCode(email);

        if (res) {
            router.refresh();
            return toast({ title: "🟢 Código de Organização atualizado.", description: "Cheque seu novo código!" });
        }

        toast({ title: "❌ Falha ao atualizar código.", description: "Tente novamente" });
    }

    return (
        <Button onClick={setNewCode}>Gerar novo código</Button>
    )

}