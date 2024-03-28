"use client";

import { callSchema } from "@/lib/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { makeCall } from "@/app/actions/call.actions";
import { useUserContext } from "@/app/context/UserContext";

export default function CallForm() {

    const { toast } = useToast();
    const { user } = useUserContext();

    const form = useForm<z.infer<typeof callSchema>>({
        resolver: zodResolver(callSchema),
        defaultValues: {
            description: ""
        }
    })

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof callSchema>) {

        const success = await makeCall(values.description, user);

        if (!success)
            return form.setError("description", {
                type: "custom",
                message: "Erro ao criar chamado.",
            }, { shouldFocus: true });

        toast({
            title: "Chamado enviado com sucesso!",
            description: "Os operadores foram notificados.",
        })

        form.setValue("description", "");

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
                    disabled={isSubmitting}
                    className="w-full md:w-max">
                    {isSubmitting ?
                        <Loader2Icon size={20} className="mr-2 animate-spin" /> :
                        <Mail size={20} className="mr-2" />
                    } Enviar chamado
                </Button>
            </form>
        </Form>
    )
}