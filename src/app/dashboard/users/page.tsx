import UsersTable from "@/components/layout/UsersTable";

export default async function UsersPage() {

    return (
        <div className="flex flex-col p-4">
            <div className="p-4">
                <h1 className="md:text-4xl text-2xl font-bold">Registrados na organização</h1>
            </div>
            <UsersTable />
        </div>
    )
}