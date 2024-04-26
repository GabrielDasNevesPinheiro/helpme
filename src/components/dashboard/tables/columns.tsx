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


export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                </Button>
            )
        },
        cell: ({ row }) => (String(row.getValue("id")))

    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
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
        accessorKey: "level",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nível
                </Button>
            )
        },
    }
]