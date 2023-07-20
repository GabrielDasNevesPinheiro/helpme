"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import AccountSetupForm from "./accountSetupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkUser } from "../utils/actions";

export default function AccountSetupPage() {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        checkUser(`${session?.user?.email}`).then((res) => {
            if(res === "REGISTERED") router.push("/");
        });
    }, []);
    
    return (
        <MainLayout>
            <AppBar />
            <div className="m-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex">Configuração de conta <Settings2Icon className="ml-2"/></CardTitle>
                        <CardDescription>Este procedimento é necessário.</CardDescription>
                        <CardContent>
                            <AccountSetupForm session={session} router={router}/>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </MainLayout>
    )
}