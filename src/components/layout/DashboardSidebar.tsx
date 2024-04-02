"use client";

import { cn } from "@/lib/utils";
import { Building2Icon, LucideIcon, Table2Icon, UsersIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";



export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="h-1/4 w-full md:w-1/4 md:h-auto border-b md:border-b-0 flex">
            <div className="flex flex-col space-y-2 h-full w-full p-2">
                <ListItem icon={Table2Icon} text="Visão geral" active={pathname === "/dashboard"} href="/dashboard" />
                <ListItem icon={Building2Icon} text="Organização" active={pathname === "/dashboard/org"} href="/dashboard/org" />
                <ListItem icon={UsersIcon} text="Usuários" active={pathname === "/dashboard/users"} href="/dashboard/users" />
            </div>
        </div>
    )
}

function ListItem({ icon: Icon, text, active, href }: { icon: LucideIcon, text: string, active: boolean, href: string }) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(href)}
            className={
                cn(active && "bg-primary/10", "flex gap-2 items-center justify-center md:justify-start text-xl p-2 rounded-md hover:bg-primary/10 hover:cursor-pointer transition-colors")
            }>
            <div className="flex gap-2 items-center justify-start w-40">
                <Icon />
                <p>{text}</p>
            </div>
        </div>
    )
}