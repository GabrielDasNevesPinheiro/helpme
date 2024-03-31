import AppBar from "@/components/layout/AppBar"
import DashboardSidebar from "@/components/layout/DashboardSidebar"
import MainLayout from "@/components/layout/MainLayout"
import { cn } from "@/lib/utils"
import { Building2Icon, LucideIcon, Table2Icon, UsersIcon } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Helpme - Dashboard",
    description: "Analise detalhadamente suas informações",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <AppBar dashboard={false} />
            <div className="flex flex-col md:flex-row w-full h-screen font-sans">
                <DashboardSidebar />
                <div className="h-3/4 w-full md:w-3/4 md:h-auto">
                    {children}
                </div>
            </div>
        </MainLayout>
    )
}

