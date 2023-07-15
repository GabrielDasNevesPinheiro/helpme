"use client";

import { useEffect, useState } from "react";
import { checkUser, getSectors, setupUser } from "../utils/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountSetupPage() {
    
    const router = useRouter();
    const { data: session, status } = useSession({ required: true });
    const [sectors, setSectors] = useState<string[]>([]);
    const [userSector, setUserSector] = useState("");
    const [userLevel, setUserLevel] = useState(2);
    const [company, setCompany] = useState("");
    const [setupState, setSetupState] = useState("");
    
    useEffect(() => {
        
        getSectors().then((sectorList) => {
            setSectors(sectorList);
        });

    }, []);

    useEffect(() => {
        checkUser(session?.user?.email as string).then((res) => {
            if (res.message === "REGISTERED") {
                router.push("/");
            }
        });
    }, [setupState]);

    function setupAccount() {
        setupUser({
            email: session?.user?.email as string,
            company,
            sector: userSector,
            level: userLevel,
        }).then((res) => {
            setSetupState(res);
        });
    }

    return (
        <main className="p-4 space-x-2 space-y-4">
            <h1>
                Termine de configurar sua conta
            </h1>

            <p>Selecione seu setor: </p>
            <select name="sector" onChange={(option) => setUserSector(option.target.value)}>
                {sectors.map((sector, key) => (
                    <option value={sector} key={key}>{sector}</option>
                ))}
            </select>
            <p>Tipo da conta</p>
            <select name="level" onChange={(option) => setUserLevel(Number.parseInt(option.target.value))}>
                <option selected disabled hidden>Selecionar</option>
                <option value={0}>Sou Chefe de uma organização</option>
                <option value={1}>Sou Técnico de uma organização</option>
                <option value={2}>Sou um funcionário de uma organização</option>
            </select>
                <div className="flex space-x-2">
                    <h1>Nome da organização: </h1>
                    <input type="text" 
                        name="company" 
                        id="company" 
                        className="border-2 border-slate-500 rounded-lg" 
                        onChange={(input) => setCompany(input.target.value)} />
                </div>
                <button className="bg-green-500 px-6 py-4 rounded-full text-white"
                onClick={() => setupAccount()}>Tudo pronto</button>
                <h1>{setupState}</h1>
        </main>
    )
}