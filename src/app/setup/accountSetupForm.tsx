import { useForm } from "react-hook-form";
import * as z from "zod";
import setupFormSchema from "./accountSetupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { checkUser, getSectors, setupUser } from "../utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck } from "lucide-react";
import { Session } from "next-auth";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


export default function AccountSetupForm({ session }: { session: Session | null }) {

    const [sectors, setSectors] = useState<string[]>([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const router = useRouter();

    useEffect(() => {

        checkUser(`${session?.user?.email}`).then((res) => {
            if(res === "REGISTERED") router.push("/");
        });

        getSectors().then((res) => {
            setSectors(res);
        })
    }, []);

    
    const form = useForm<z.infer<typeof setupFormSchema>>({
        resolver: zodResolver(setupFormSchema),
        defaultValues: {
            level: "2",
            sector: "Administrativo",
        }
        
    })

    function onSubmit(values: z.infer<typeof setupFormSchema>) {
        
        setIsWaiting(true);
        
        setupUser({
            email: `${session?.user?.email}`,
            sector: values.sector,
            level: Number(values.level),
            company: values.company
        }).then((res) => {
            
            setIsWaiting(false);
            
            if(res === "COMPANY HAS OWNER")  // If a boss try to register an existent organization
                return form.setError("company", {
                    type: "custom",
                    message: "Você não pode ser chefe dessa organização.",
                }, { shouldFocus: true });

            if(res === "NO COMPANY") // if no company found
                return form.setError("company", {
                    type: "custom",
                    message: "Organização não encontrada",
                }, { shouldFocus: true });

            if(res === "ERROR") // server error 
                return form.setError("root", {
                    type: "custom",
                    message: "Erro interno, tente novamente",
                }, { shouldFocus: true });

            if(res === "SUCCESS") {

                form.reset();

                toast({
                    title: "Configuração efetuada com sucesso",
                    description: "Você será redirecionado em alguns segundos...",
                });

                setTimeout(() => {
                    router.push("/");
                }, 4000);
            }
            
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="setup">
                <FormField 
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código da sua organização</FormLabel>
                            <FormControl>
                                <Input autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                <FormField 
                    name="level"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-x-2">
                            <FormLabel>Selecione seu nível</FormLabel>
                            <FormControl>
                                <select form="setup" className="border bg-transparent rounded dark:hover:bg-slate-600" {...field}>
                                    <option value={0}>Chefe</option>
                                    <option value={1}>Operador</option>
                                    <option value={2} selected>Funcionário</option>
                                </select>
                            </FormControl>
                        </FormItem>
                    )}/>
                <FormField
                    name="sector"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-x-2">
                            <FormLabel>Selecione seu setor</FormLabel>
                            <FormControl>
                                <select form="setup" className="border bg-transparent rounded dark:hover:bg-slate-600" {...field}>
                                    {sectors.map((sector) => (
                                    <option key={sector} value={sector}>{sector}</option>    
                                ))}</select>
                            </FormControl>
                        </FormItem>
                    )} />
                    <Button type="submit" className="w-full md:w-auto" disabled={ isWaiting ? true : false}><BadgeCheck className="mr-2"/> Confirmar</Button>
            </form>
        </Form>
    )
}