import { getServerSession } from "next-auth";
import { usersColumns } from "../dashboard/tables/columns";
import { DataTable } from "../dashboard/tables/DataTable";
import { getUsers } from "@/app/actions/Users/read";


export default async function UsersTable() {
    const session = await getServerSession();

    const email = String(session?.user?.email);
    const users = await getUsers(email);

    return (
        <div className="p-2 border rounded-md">
            <DataTable columns={usersColumns} data={users} />
        </div>
    )
}