"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import CallHistoryWidget from "@/components/widgets/callHistoryWidget/callHistoryWidget";
import CallWidget from "@/components/widgets/callWidget/CallWidget";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";

export default function Home() {

  return (
    <MainLayout>
      <AppBar />
      <div className="m-4 space-y-2 md:flex md:space-x-4 md:space-y-0">
        <ProfileWidget />
        <CallWidget />
        <CallHistoryWidget />
      </div>
    </MainLayout>
  )
}
