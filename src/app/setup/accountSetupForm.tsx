import { useForm } from "react-hook-form";
import * as z from "zod";
import setupFormSchema from "./accountSetupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getSectors } from "../utils/actions";
import { Button } from "@/components/ui/button";


export default function AccountSetupForm() {

    const [sectors, setSectors] = useState<string[]>([]);

    useEffect(() => {
        getSectors().then((res) => {
            setSectors(res);
        })
    }, []);

    
    const form = useForm<z.infer<typeof setupFormSchema>>({
        resolver: zodResolver(setupFormSchema),
        defaultValues: {
            company: "",
            level: "2",
            sector: "",
        }
    })

    function onSubmit(values: z.infer<typeof setupFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="setup">
                <FormField
                    name="sector"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selecione seu setor</FormLabel>
                            <FormControl>
                                <select form="setup" {...field}>{sectors.map((sector) => (
                                    <option key={sector} value={sector}>{sector}</option>    
                                ))}</select>
                            </FormControl>
                        </FormItem>
                    )} />
                    <Button type="submit">Enviar</Button>
            </form>
        </Form>
    )
}