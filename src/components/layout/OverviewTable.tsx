import { getServerSession } from "next-auth";
import { columns } from "../dashboard/tables/columns";
import { DataTable } from "../dashboard/tables/DataTable";
import { getCalls } from "@/app/actions/Calls/read";


export default async function OverviewTable() {
    const session = await getServerSession();

    const email = String(session?.user?.email);
    const callData = await getCalls(email);

    return (
        <div className="p-2 border rounded-md">
            <DataTable columns={columns} data={callData} />
        </div>
    )
}