import { getServerSession } from "next-auth"
import DataViews from "@/components/layout/DataViews";
import OverviewTable from "@/components/layout/OverviewTable";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { getUserInfo } from "../actions/Users/read";

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
                <div className="p-2 space-y-2 border-t md:border-0">
                    <h1 className="text-3xl text-center">Chamados</h1>
                    <OverviewTable />
                </div>
            </Suspense>
        </div>
    )
}