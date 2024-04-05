import { getCompany } from "@/app/actions/Company/read";
import { getUserInfo } from "@/app/actions/Users/read";
import CodeGenerator from "@/components/ui/code-generator";
import { ShieldAlertIcon } from "lucide-react";
import { getServerSession } from "next-auth"

export default async function OrgPage() {
    const session = await getServerSession();
    const user = await getUserInfo(session!.user!.email!);
    const company = user.level === "Chefe" ? await getCompany(user.email) : null;

    return (
        <div className="w-full flex flex-col">
            <div className="p-4 text-4xl">
                <h1>Olá <strong>{user.name}</strong> 👋</h1>
                <p className="text-xl">Você é {user.level} em {user.company}.</p>
            </div> {company ?
                <div className="w-full flex flex-col items-start md:pt-36 md:pl-24 pt-16 pl-4 gap-y-4">
                    <h1 className="text-4xl font-bold">{company.name}</h1>
                    <span className="font-thin text-xl">Código: {company.code}</span>
                    <CodeGenerator email={user.email} />
                </div>
                :
                <div className="w-full flex pt-48 items-center md:pl-14 pl-4 gap-2 text-primary/70">
                    <ShieldAlertIcon size={60} strokeWidth={1} />
                    <span className="text-3xl">Você não tem permissões</span>
                </div>
            }
        </div>
    )
}