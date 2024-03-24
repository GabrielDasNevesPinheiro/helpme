import { Socket, io } from "socket.io-client";

export const socket: Socket<ServerToClient, ClientToServer> = io(`${process.env.SOCKET_URL}`);
