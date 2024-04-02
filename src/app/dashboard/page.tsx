import { getServerSession } from "next-auth"
import { getOperatorCount, getUserCount, getUserInfo } from "../actions/user.actions";
import DataView from "@/components/ui/dataview";
import { getCallCount } from "../actions/call.actions";

export default async function DashboardPage() {
    const session = await getServerSession();

    const email = String(session?.user?.email);

    const { company } = await getUserInfo(email);
    const userCount = await getUserCount(email);
    const operatorCount = await getOperatorCount(email);
    const callCount = await getCallCount(email);

    /**
     * Chamados criados pelo usuário
     * Chamados atendidos
     * Quem mais resolveu seus problemas
     * 
     */

    return (
        <div className="w-full flex flex-col">
            <div className="p-4 text-3xl sm:text-4xl md:text-5xl font-bold">
                <p>{company}</p>
            </div>
            <div className="flex gap-4 p-2 flex-col md:flex-row">
                <DataView description="Total de cadastros" data={userCount} />
                <DataView description="Operadores" data={operatorCount} />
                <DataView description="Total de chamados" data={callCount} />
            </div>
        </div>
    )
}