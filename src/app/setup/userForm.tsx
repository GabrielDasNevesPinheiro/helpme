import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";
import { userSchema } from "./schemas";
import { sectors } from "../actions/sector.actions";
import { getUserInfo, setupUser } from "../actions/user.actions";
import { toast } from "@/components/ui/use-toast";


export default function UserForm() {
    const router = useRouter();
    const { data: session } = useSession({ required: true });
    const [done, setDone] = useState(false);
    const { setUser } = useUserContext();

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),

    })
    const { isSubmitting } = form.formState;

    function onSubmit(values: z.infer<typeof userSchema>) {

        const showError = (message: string) => {

            form.setError(`code`, {
                type: "custom",
                message: message,
            }, {
                shouldFocus: true
            });

        }

        const register = async () => {

            if (!session?.user?.email) return showError("Por favor, tente novamente.");
            const res = await setupUser({
                email: session.user.email,
                code: values.code,
                level: values.level,
                sector: values.sector
            });

            if (res == "ERROR") return showError("Ocorreu um erro, tente de novo");
            if (res == "NO COMPANY") return showError("Organização não encontrada, verifique o código");
            if (res == "SUCCESS") toast({ title: "✅ Configuração feita com sucesso.", description: "Você será redirecionado." });

            setUser(await getUserInfo(session.user.email));
            form.setValue("code", "");
            setDone(true);
            await new Promise(resolve => setTimeout(() => { router.push("/") }, 2000));

        }

        register();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col" id="setup">
                <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input autoComplete="off" placeholder="Código da organização" className="h-16 text-center md:text-2xl text-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <div className="flex flex-col w-full space-y-2">
                    <FormField
                        name="sector"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <select form="setup" {...field} className="w-full h-10 bg-transparent border border-input font-sans text-sm text-center rounded-md">
                                        <option disabled className="bg-black p-2 text-lg" selected>Selecione seu setor</option>
                                        {sectors.map((sector) => (
                                            <option value={sector} className="bg-black p-2 text-lg" key={sector}>{sector}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        name="level"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <select form="setup" {...field} className="w-full h-10 bg-transparent border border-input font-sans text-sm text-center rounded-md">
                                        <option disabled selected className="bg-black p-2 text-lg">Selecione sua função</option>
                                        <option value="1" id="op" className="bg-black p-2 text-lg">Operador</option>
                                        <option value="2" className="bg-black p-2 text-lg">Funcionário</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <Button type="submit" className="w-full md:w-auto transition-all" disabled={isSubmitting || done}>
                    {isSubmitting ? <Loader2Icon className="m-2 animate-spin" /> : <BadgeCheck className="m-2" />}
                    Confirmar
                </Button>
            </form>
        </Form>
    )
}