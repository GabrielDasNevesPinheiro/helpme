import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck, Loader2Icon } from "lucide-react";
import { companySchema } from "../../lib/schemas";
import { useSession } from "next-auth/react";
import { createCompany } from "../actions/company.actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";
import { getUserInfo } from "../actions/user.actions";


export default function CompanyForm() {
    const router = useRouter();
    const { data: session } = useSession({ required: true });
    const [done, setDone] = useState(false);
    const { setUser } = useUserContext();

    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),

    })
    const { isSubmitting } = form.formState;

    function onSubmit(values: z.infer<typeof companySchema>) {

        const showError = (message: string) => {

            form.setError(`company`, {
                type: "custom",
                message: message,
            }, {
                shouldFocus: true
            });

        }

        const register = async () => {

            if (!session?.user?.email) return showError("Por favor, tente novamente.");
            const res = await createCompany(values.company, session.user.email);

            if (!res) return showError("Por favor, tente novamente.");
            if (res) setDone(true);
            form.setValue("company", "");
            toast({
                title: "✅ Registro concluído",
                description: "Você será redirecionado.",
            });
            setUser(await getUserInfo(session.user.email));
            await new Promise(resolve => setTimeout(() => { router.push("/") }, 2000));

        }

        register();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col" id="setup">
                <FormField
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input autoComplete="off" placeholder="Nome da sua empresa" className="h-16 text-center md:text-2xl text-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <Button type="submit" className="w-full md:w-auto transition-all" disabled={isSubmitting || done}>
                    {isSubmitting ? <Loader2Icon className="m-2 animate-spin" /> : <BadgeCheck className="m-2" />}
                    Confirmar
                </Button>
            </form>
        </Form>
    )
}