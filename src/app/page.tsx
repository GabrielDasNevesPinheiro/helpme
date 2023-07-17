"use client";

import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";

export default function Home() {

  return (
    <MainLayout>
      <AppBar />
      <ProfileWidget />
    </MainLayout>
  )
}
