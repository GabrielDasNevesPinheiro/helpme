import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Briefcase, BuildingIcon, InfoIcon, KanbanSquare, Mail } from "lucide-react";
import { useState } from "react";
import { ParsedUser } from "@/app/utils/ActionsResponses";
import ProfileWidgetSkeleton from "./profileWidgetSkeleton";
import { motion } from "framer-motion";
import MotionDiv from "@/components/ui/animation/MotionDiv";
import { useUserContext } from "@/app/providers/userContextProvider";

export default function ProfileWidget() {

    const { data: session } = useSession();
    const [user, setUser] = useState<ParsedUser>();
    const userContext = useUserContext();

    if (!userContext?.user) return <ProfileWidgetSkeleton />// if info is loading, display loading skeleton



    return (
        <MotionDiv animation="fadeIn" className="w-full h-full lg:h-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex">Informações <InfoIcon className="ml-2" /></CardTitle>
                    <CardDescription>Lembre-se, se algo estiver errado inicie um chamado!</CardDescription>
                </CardHeader>
                <CardContent>
                    <section className="flex flex-col space-y-4">
                        <span className="flex items-center space-x-4 text-2xl">
                            <Avatar className="border-2 border-foreground">
                                <AvatarImage src={`${session?.user?.image}`} />
                                <AvatarFallback>{session?.user?.name}</AvatarFallback>
                            </Avatar>
                            <h1>{userContext.user.name}</h1>
                        </span>
                        <div className="flex flex-col pl-2 space-y-2">
                            <span className="flex space-x-2">
                                <BuildingIcon />
                                <p>{userContext.user.company}</p>
                            </span>
                            <span className="flex space-x-2">
                                <Briefcase />
                                <p>{userContext.user.level}</p>
                            </span>
                            <span className="flex space-x-2">
                                <KanbanSquare />
                                <p>{userContext.user.sector}</p>
                            </span>
                            <span className="flex space-x-2">
                                <Mail />
                                <p>{userContext.user.email}</p>
                            </span>
                        </div>
                    </section>
                </CardContent>

            </Card>
        </MotionDiv>
    )
}