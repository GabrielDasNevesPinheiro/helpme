"use client";

import * as z from "zod";

const formSchema = z.object({
    description: z.string()
                    .min(5, { message: "Descreva bem o problema..."})
                    .max(300, { message: "Você ultrapassou o limite de caracteres." })
});