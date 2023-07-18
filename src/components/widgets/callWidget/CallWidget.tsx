import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CallForm from "./CallForm";

export default function CallWidget() {
    return (
        <Card className="sm:max-w-md">
            <CardHeader>
                <CardTitle>Algum problema?</CardTitle>
                <CardDescription>contate os operadores</CardDescription>
                <CardContent>
                    <CallForm />
                </CardContent>
            </CardHeader>
        </Card>
    )
}