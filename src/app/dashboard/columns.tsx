"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Call>[] = [
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                </Button>
            )
        },
        cell: ({ row }) => (row.getValue("status") ? "Aberto" : "Fechado")
    },
    {
        accessorKey: "user",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Usuário
                </Button>
            )
        },
    },
    {
        accessorKey: "sector",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Setor
                </Button>
            )
        },
    },
    {
        accessorKey: "closedBy",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Operador
                </Button>
            )
        },
    }
]