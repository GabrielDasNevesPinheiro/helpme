"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import AccountSetupForm from "./accountSetupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountSetupFormSkeleton from "./accountSetupFormSkeleton";
import { checkUser } from "../actions/userActions";

export default function AccountSetupPage() {

    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser(`${session?.user?.email}`).then((res) => {
            setLoading(false);
            if (res === "REGISTERED") return router.push("/");
        });
    }, []);

    return (
        <MainLayout>
            <AppBar />
            <div className="m-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex">Configuração de conta <Settings2Icon className="ml-2" /></CardTitle>
                        <CardDescription>Este procedimento é necessário.</CardDescription>
                        <CardContent>
                            {!loading ? <AccountSetupForm session={session} router={router} />
                                : <AccountSetupFormSkeleton />
                            }
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </MainLayout>
    )
}