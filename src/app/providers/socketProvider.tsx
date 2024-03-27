"use client";

import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Info, User, XCircle } from "lucide-react";
import { motion, useAnimate } from "framer-motion";
import { useUserContext } from "../context/UserContext";
import { getCall } from "../actions/call.actions";



export default function SocketProvider() {

    const [isVisible, setVisible] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [call, setCall] = useState<Call>();
    const [scope, animate] = useAnimate();
    const userContext = useUserContext();


    useEffect(() => {

        const setupSocket = async () => {
            setAudio(new Audio("/notify.mp3"));
            if (userContext.user.company !== "") {


                const socket: Socket<ServerToClient, ClientToServer> = io(`${process.env.SOCKET_URL}`, {
                    auth: { token: userContext.user.company }
                });

                socket.on("connect", () => {
                    userContext.setConnected(true);
                })

                socket.on("connect_error", () => {
                    userContext.setConnected(false);
                })

                socket.on("disconnect", () => {
                    userContext.setConnected(false);
                })

                if (userContext.user.level === "Operador")
                    socket.on("callAlert", async (callID: string) => {
                        const call = await getCall(callID);
                        setCall(call);
                        setVisible(true);
                        audio?.play();
                        animate(scope.current, { opacity: 1 }, { duration: 0.3 });

                    });

                return () => {
                    socket.disconnect();
                }

            }

        }


        setupSocket();

    }, [userContext.user]);

    return (
        <motion.div ref={scope}
            className={`border rounded-md bg-primary-foreground w-96 h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? "block" : "hidden"}`}>
            <div className="absolute w-full h-4">
                <section className="flex flex-col justify-start space-x-1 mt-2 ml-2">
                    <span className={`w-4 h-4 rounded-full bg-red-400 hover:opacity-50 cursor-pointer`} onClick={() => {
                        animate(scope.current, { opacity: 0 }, { duration: 0.3 }).then(() => setVisible(false));

                    }}></span>
                    <Card className="m-4 bg-transparent border-0">
                        <CardHeader>
                            <CardTitle>
                                <span className="flex max-w-full space-x-2 shadow-none">
                                    <p>Novo Chamado</p>
                                    <Info className="text-orange-300" />
                                </span>
                                <CardDescription>{call?.sector}</CardDescription>
                            </CardTitle>
                            <CardContent>
                                <div className="flex flex-col space-y-4 pt-4">
                                    <span className="flex space-x-2 items-center">
                                        <User />
                                        <p>{call?.user}</p>
                                    </span>
                                    <span className="flex space-x-2 items-center">
                                        <XCircle />
                                        <p>{!call?.status ? "Resolvido" : "Aberto"}</p>
                                    </span>
                                    <span className="flex space-x-2 items-center">
                                        <Clock />
                                        <p>{call?.datetime}</p>
                                    </span>
                                </div>
                                <div className="flex justify-start m-4 opacity-75">
                                    <p>{call?.description}</p>
                                </div>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </section>
            </div>
        </motion.div>
    )

}