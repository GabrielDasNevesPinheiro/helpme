import { getServerSession } from "next-auth"
import { getOperatorCount, getUserCount, getUserInfo } from "../actions/user.actions";
import DataView from "@/components/ui/dataview";
import { getCallCount, getCalls } from "../actions/call.actions";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export default async function DashboardPage() {
    const session = await getServerSession();

    const email = String(session?.user?.email);

    const { company } = await getUserInfo(email);
    const userCount = await getUserCount(email);
    const operatorCount = await getOperatorCount(email);
    const callData = await getCalls(email);
    const callCount = callData.length;
    const pendingCallCount = callData.filter((call) => call.status).length;
    const solvedCallCount = callData.filter((call) => !call.status).length;

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
            <div className="flex gap-4 p-2 flex-col md:flex-row flex-wrap">
                <DataView description="Total de cadastros" data={userCount} />
                <DataView description="Operadores" data={operatorCount} />
                <DataView description="Total de chamados" data={callCount} />
                <DataView description="Chamados abertos" data={pendingCallCount} />
                <DataView description="Chamados resolvidos" data={solvedCallCount} />
            </div>
            <div className="p-2 border  m-2 rounded-md">
                <DataTable columns={columns} data={callData} />
            </div>
        </div>
    )
}