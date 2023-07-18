
import callFormSchema from "./callFormSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CallWidget() {

    const form = useForm<z.infer<typeof callFormSchema>>({
        resolver: zodResolver(callFormSchema),
        defaultValues: {
            description: ""
        }
    })

    function onSubmit(values: z.infer<typeof callFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descreva seu problema para os operadores</FormLabel>
                            <FormControl>
                                <Input placeholder="O problema é..." {...field} />
                            </FormControl>
                            <FormDescription>Seja direto(a) para melhor entendimento.</FormDescription>
                            <FormMessage />
                        </FormItem>
                )}
                />
                <Button type="submit">Enviar chamado</Button>
            </form>
        </Form>
    )
}