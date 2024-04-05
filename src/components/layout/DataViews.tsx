
import { getCalls } from "@/app/actions/Calls/read";
import { getUserCount } from "@/app/actions/Users/read";
import DataView from "@/components/ui/dataview";
import { getServerSession } from "next-auth";

export default async function DataViews() {
    const session = await getServerSession();


    const email = String(session?.user?.email);

    const userCount = await getUserCount(email);
    const count = await getUserCount(email);
    const callData = await getCalls(email);
    const callCount = callData.length;
    const pendingCallCount = callData.filter((call) => call.status).length;
    const solvedCallCount = callData.filter((call) => !call.status).length;

    return (
        <div className="grid lg:grid-cols-5 gap-2 p-2">
            <DataView description="Total de cadastros" data={count.operators + count.employees} />
            <DataView description="Operadores" data={count.operators} />
            <DataView description="Total de chamados" data={callCount} />
            <DataView description="Chamados abertos" data={pendingCallCount} />
            <DataView description="Chamados resolvidos" data={solvedCallCount} />
        </div>
    )
}