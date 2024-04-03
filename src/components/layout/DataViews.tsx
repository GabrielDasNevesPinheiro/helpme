
import { getCalls } from "@/app/actions/call.actions";
import { getOperatorCount, getUserCount, getUserInfo } from "@/app/actions/user.actions";
import DataView from "@/components/ui/dataview";
import { getServerSession } from "next-auth";

export default async function DataViews() {
    const session = await getServerSession();


    const email = String(session?.user?.email);

    const userCount = await getUserCount(email);
    const operatorCount = await getOperatorCount(email);
    const callData = await getCalls(email);
    const callCount = callData.length;
    const pendingCallCount = callData.filter((call) => call.status).length;
    const solvedCallCount = callData.filter((call) => !call.status).length;

    return (
        <div className="flex gap-4 p-2 flex-col md:flex-row flex-wrap">
            <DataView description="Total de cadastros" data={userCount} />
            <DataView description="Operadores" data={operatorCount} />
            <DataView description="Total de chamados" data={callCount} />
            <DataView description="Chamados abertos" data={pendingCallCount} />
            <DataView description="Chamados resolvidos" data={solvedCallCount} />
        </div>
    )
}