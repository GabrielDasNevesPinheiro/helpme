"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkUser } from "../actions/user.actions";
import { Button } from "@/components/ui/button";
import CompanyForm from "./companyForm";

export default function AccountSetupPage() {

    const { data: session } = useSession({ required: true });
    const router = useRouter();

    const [registerType, setRegisterType] = useState<"none" | "companyOwner" | "normal">("none");

    const registerCompany = () => {
        setRegisterType("companyOwner")
    }

    const registerUser = () => {
        setRegisterType("normal");
    }

    useEffect(() => {
        if (!session?.user?.email) return () => { };

        const check = async () => {
            const res = await checkUser(session.user.email);
            if (res === "REGISTERED") return router.push("/");
        }
        check();
    }, [session?.user?.email]);

    return (
        <MainLayout>
            <AppBar dashboard={false} />
            <div className="w-full justify-center flex flex-col gap-y-10 items-center text-center pt-24">
                <h1 className="text-3xl md:text-7xl">Vamos configurar sua conta 🚀</h1>
                {
                    registerType === "none" &&
                    <div className="flex flex-col gap-y-2 w-full h-96 p-4 md:w-[700px]">
                        <Button className="h-16 md:text-xl flex justify-between hover:bg-white/10 hover:h-20 transition-all"
                            variant={"link"}
                            onClick={registerUser}>
                            Registrar em organização existente
                            <ArrowRightIcon />
                        </Button>
                        <Button className="h-16 md:text-xl flex justify-between hover:bg-white/10 hover:h-20 transition-all"
                            variant={"link"}
                            onClick={registerCompany}>
                            Registrar minha organização
                            <ArrowRightIcon />
                        </Button>
                    </div>
                }
                {registerType === "companyOwner" &&
                    <div className="w-full flex flex-col gap-y-4 md:max-w-[400px] p-4 md:p-0">
                        <CompanyForm />
                    </div>

                }
            </div>
        </MainLayout>
    )
}