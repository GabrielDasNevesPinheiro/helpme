import * as z from "zod";

const companySchema = z.object({
    company: z.string({ required_error: "Insira o nome da sua Organização." }).min(3, {
        message: "Por favor, insira um valor válido"
    }).max(60, {
        message: "Você excedeu o limite de 60 caracteres"
    }),
});

export default companySchema;