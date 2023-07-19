import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CallForm from "./CallForm";
import { HelpCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ParsedUser } from "@/app/utils/ActionsResponses";
import { Session } from "next-auth";
import { getUserInfo } from "@/app/utils/actions";
import CallWidgetSkeleton from "./callWidgetSkeleton";

export default function CallWidget() {

    const { data: session } = useSession();
    const [user, setUser] = useState<ParsedUser>();

    useEffect(() => {
        
        getUserInfo(`${session?.user?.email}`).then((res) => {
            setUser(res);
        });

    }, [])

    if(!user) return <CallWidgetSkeleton />

    return (
        <Card className="sm:max-w-md p-2">
            <CardHeader>
                <CardTitle className="flex">Algum problema? <HelpCircle className="ml-2"/></CardTitle>
                <CardDescription>contate os operadores</CardDescription>
                <CardContent>
                    <CallForm user={user as ParsedUser}/>
                </CardContent>
            </CardHeader>
        </Card>
    )
}