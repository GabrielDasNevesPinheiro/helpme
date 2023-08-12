"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import { Label } from "@/components/ui/label";
import CallHistoryWidget from "@/components/widgets/callHistoryWidget/callHistoryWidget";
import CallWidget from "@/components/widgets/callWidget/CallWidget";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";

export default function Home() {
  
  return (
    <MainLayout>
      <AppBar />
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 lg:grid-rows-1 p-4">
      <div className="flex flex-col pt-4 justify-start items-center">
          <Label className="text-4xl">Helpme</Label>
          <Label className="text-base opacity-70" >A sua plataforma de suporte técnico</Label>
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
