import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";
import { Suspense } from 'react';
import Connection from '../components/ui/connection';
import ProfileWidgetSkeleton from "@/components/widgets/profileWidget/profileWidgetSkeleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CallWidget from "@/components/widgets/callWidget/CallWidget";
import CallHistoryWidget from "@/components/widgets/callHistoryWidget/callHistoryWidget";
import { Loader2Icon } from "lucide-react";

export const metadata: Metadata = {
  title: 'Helpme - Início',
  description: 'Acesse as principais funcionalidades',
}


export default async function Home() {
  const session = await getServerSession();

  if (!session) return redirect("/login");

  return (
    <MainLayout>
      <AppBar />
      <div className="flex flex-col md:flex-row justify-between p-12 gap-y-4 md:gap-y-0 min-h-[288px]">
        <Suspense fallback={<ProfileWidgetSkeleton />}>
          <ProfileWidget />
        </Suspense>
        <Connection />
      </div>
      <CallWidget />
      <Suspense fallback={<Loader2Icon className="animate-spin self-center m-4" />}> {/**you must implement a better loading. */}
        <CallHistoryWidget />
      </Suspense>
    </MainLayout>
  )
}
