import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Briefcase, BuildingIcon, InfoIcon, KanbanSquare, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { ParsedUser } from "@/app/utils/ActionsResponses";
import { getUserInfo } from "@/app/utils/actions";
import ProfileWidgetSkeleton from "./profileWidgetSkeleton";


export default function ProfileWidget() {

    const { data: session } = useSession();
    const [user, setUser] = useState<ParsedUser>();

    useEffect(() => {
        getUserInfo(`${session?.user?.email}`).then((userInfo) => {
            setUser(userInfo);
        })
    }, []);

    if(!user) return <ProfileWidgetSkeleton />// if info is loading, display loading skeleton
        
    

    return (
        <Card className="sm:max-w-md">
            <CardHeader>
                <CardTitle className="flex">Informações <InfoIcon className="ml-2" /></CardTitle>
                <CardDescription>Lembre-se, se algo estiver errado inicie um chamado!</CardDescription>
            </CardHeader>
            <CardContent>
                <section className="flex flex-col space-y-4">
                    <span className="flex items-center space-x-4 text-2xl">
                        <Avatar className="border-2 border-foreground">
                            <AvatarImage src={`${session?.user?.image}`}/>
                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                        </Avatar>
                        <h1>{session?.user?.name}</h1>
                    </span>
                    <div className="flex flex-col pl-2 space-y-2">
                        <span className="flex space-x-2">
                            <BuildingIcon />
                            <p>{user?.company}</p>
                        </span>
                        <span className="flex space-x-2">
                            <Briefcase/>
                            <p>{user?.level}</p>
                        </span>
                        <span className="flex space-x-2">
                            <KanbanSquare/>
                            <p>{user?.sector}</p>
                        </span>
                        <span className="flex space-x-2">
                            <Mail/>
                            {/* this <p> tag contains a code to hide some email chars */}
                            <p>{user?.email.replace(user?.email.slice(2, user.email.indexOf("@")), "*".repeat(user.email.indexOf("@") - 2))}</p> 
                        </span>
                    </div>
                </section>
            </CardContent>

        </Card>
    )
}