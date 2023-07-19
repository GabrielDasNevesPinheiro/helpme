
import callFormSchema from "./callFormSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { makeCall } from "@/app/utils/actions";
import { ParsedUser } from "@/app/utils/ActionsResponses";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";

export default function CallForm({ session, user}: { session: Session, user: ParsedUser}) {
    
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof callFormSchema>>({
        resolver: zodResolver(callFormSchema),
        defaultValues: {
            description: ""
        }
    })

    function onSubmit(values: z.infer<typeof callFormSchema>) {
        
        setIsWaiting(true); // is waiting until we done here

        makeCall(values.description, user as ParsedUser).then((isDone) => {

            if(!isDone){ // if server return false, something went wrong.

                return form.setError("description", {
                    type: "custom",
                    message: "Erro ao criar chamado.",
                }, { shouldFocus: true });

            }

            toast({
                title: "Chamado enviado com sucesso!",
                description: "Os operadores foram notificados.",
            })

            setIsWaiting(false);
            return form.reset();
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel>Descreva seu problema para os operadores</FormLabel>
                            <FormControl>
                                <Input autoComplete={"off"} placeholder="O problema é..." {...field} />
                            </FormControl>
                            <FormDescription>Seja direto(a) para melhor entendimento.</FormDescription>
                            <FormMessage />
                        </FormItem>
                )}
                />
                <Button 
                    type="submit" 
                    disabled={ isWaiting ? true : false }
                    className="w-full md:w-max">
                        <Mail size={20} className="mr-2"/> Enviar chamado 
                </Button>
            </form>
        </Form>
    )
}