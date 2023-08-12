import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CallForm from "./CallForm";
import { HelpCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import CallWidgetSkeleton from "./callWidgetSkeleton";
import MotionDiv from "@/components/ui/animation/MotionDiv";
import { useUserContext } from "@/app/providers/userContextProvider";

export default function CallWidget() {

    const userContext = useUserContext();

    if (!userContext?.user) return <CallWidgetSkeleton />

    return (
        <MotionDiv animation="fadeIn">

            <Card className="p-2">
                <CardHeader>
                    <CardTitle className="flex">Algum problema? <HelpCircle className="ml-2" /></CardTitle>
                    <CardDescription>contate os operadores</CardDescription>
                    <CardContent>
                        <CallForm user={userContext.user} />
                    </CardContent>
                </CardHeader>
            </Card>
        </MotionDiv>
    )
}