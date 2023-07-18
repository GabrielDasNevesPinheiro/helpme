"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import CallWidget from "@/components/widgets/callWidget/CallForm";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";

export default function Home() {

  return (
    <MainLayout>
      <AppBar />
      <div className="m-4">
        <ProfileWidget />
        <CallWidget />
      </div>
    </MainLayout>
  )
}
