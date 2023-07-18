import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CallWidget() {
    return (
        <Card className="sm:max-w-md">
            <CardHeader>
                <CardTitle>Algum problema?</CardTitle>
                <CardDescription>contate os operadores</CardDescription>
            </CardHeader>
        </Card>
    )
}