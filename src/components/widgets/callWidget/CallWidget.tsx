import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CallForm from "./CallForm";
import { HelpCircle } from "lucide-react";

export default function CallWidget() {
    return (
        <Card className="sm:max-w-md p-2">
            <CardHeader>
                <CardTitle className="flex">Algum problema? <HelpCircle className="ml-2"/></CardTitle>
                <CardDescription>contate os operadores</CardDescription>
                <CardContent>
                    <CallForm />
                </CardContent>
            </CardHeader>
        </Card>
    )
}