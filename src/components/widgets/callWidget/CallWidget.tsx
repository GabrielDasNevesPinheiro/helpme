
import callFormSchema from "./callFormSchema";
import * as z from "zod";
import { useForm } from "react-hook-form/dist/useForm";
import { zodResolver } from "@hookform/resolvers/zod";

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
        <div>Fazer chamado aqui</div>
    )
}