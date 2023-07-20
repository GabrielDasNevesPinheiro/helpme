"use client";

import * as z from "zod";

const setupFormSchema = z.object({
    sector: z.string(),
    company: z.string({ required_error: "Por favor insira um valor"}).min(3, {
        message: "Por favor, insira um valor válido"
    }).max(20, {
        message: "Você excedeu o limite de 20 caracteres"
    }),
    level: z.enum(["0", "1", "2"]),
});

export default setupFormSchema;