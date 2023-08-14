"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Label } from "@/components/ui/label";
import CallHistoryWidget from "@/components/widgets/callHistoryWidget/callHistoryWidget";
import CallWidget from "@/components/widgets/callWidget/CallWidget";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";
import { useUserContext } from "./context/UserContext";
import { Circle } from "lucide-react";


const connectionStyle = {
  "true": "block w-4 h-4 bg-green-500 rounded-full animate-pulse",
  "false": "block w-4 h-4 bg-red-500 rounded-full animate-pulse"
}

export default function Home() {

  const context = useUserContext();

  return (
    <MainLayout>
      <AppBar />
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 lg:grid-rows-1 p-4">
      <div className="flex flex-col pt-4 justify-start items-center space-y-8">
        <p className="flex flex-col items-center">
          <Label className="text-4xl">Helpme</Label>
          <Label className="text-base opacity-70" >A sua plataforma de suporte técnico</Label>
        </p>
          
          <section className="space-y-3">
            <span className="flex items-center space-x-2">
              <div className={connectionStyle[`${context.connected}`]}></div>
              <Label className="text-xl">{ context.connected ? "Conectado" : "Desconectado"}</Label>
            </span>
          </section>
        </div>
        <div className="flex flex-col space-y-4">
          <ProfileWidget />
          <CallWidget />
        </div>
        <CallHistoryWidget />
      </div>
    </MainLayout>
  )
}
