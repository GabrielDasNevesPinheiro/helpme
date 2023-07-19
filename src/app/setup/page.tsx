"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import AccountSetupForm from "./accountSetupForm";

export default function AccountSetupPage() {
    
    return (
        <MainLayout>
            <AppBar />
            <div className="m-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex">Configuração de conta <Settings2Icon className="ml-2"/></CardTitle>
                        <CardDescription>Este procedimento é necessário.</CardDescription>
                        <CardContent>
                            <AccountSetupForm/>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </MainLayout>
    )
}