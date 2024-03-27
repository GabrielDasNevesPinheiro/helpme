"use server";
import connectDatabase from "@/connections/db";

export async function getSectors(): Promise<string[]> {

    return ["TI", "Presidência", "Logística", "RH", "Compras", "Marketing", "Operações", "Financeiro", "Produção", "SAC", "Jurídico", "Comercial"];

}
