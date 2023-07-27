import { useEffect } from "react"
import { Socket, io } from "socket.io-client";
import { ClientToServer, ServerToClient } from "../utils/SocketActions";


export default function SocketProvider({ company }: { company: string }) {

    useEffect(() => {

        const socket: Socket<ServerToClient, ClientToServer> = io("http://localhost:3001", {
            auth: { token: company }
        });

        socket.on("connect", () => {
            console.log("CONNECTED TO SOCKET SERVER");
        });

        socket.on("callAlert", (callID) => {
            console.log(`CALL RECEIVED ${callID}`);
        });

        return () => {
            socket.disconnect();
        }

    }, []);

    return (
        <></>
    )

}