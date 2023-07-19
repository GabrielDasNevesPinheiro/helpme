"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";

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
                            aqui fica o form
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </MainLayout>
    )
}