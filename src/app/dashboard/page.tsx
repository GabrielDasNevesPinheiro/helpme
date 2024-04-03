import { getServerSession } from "next-auth"
import { getUserInfo } from "../actions/user.actions";
import DataViews from "@/components/layout/DataViews";
import OverviewTable from "@/components/layout/OverviewTable";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

export default async function DashboardPage() {
    const session = await getServerSession();

    const email = String(session?.user?.email);

    const { company } = await getUserInfo(email);

    /**
     * Chamados criados pelo usuário
     * Chamados atendidos
     * Quem mais resolveu seus problemas
     * 
     */

    return (
        <div className="w-full flex flex-col ">
            <div className="p-4 text-3xl sm:text-4xl md:text-5xl font-bold">
                <p>{company}</p>
            </div>
            <Suspense fallback={<div className="flex justify-center w-full p-32">
                <Loader2Icon className="animate-spin" />
            </div>}>
                <DataViews />
            </Suspense>

            <Suspense fallback={<></>}>
                <OverviewTable />
            </Suspense>
        </div>
    )
}