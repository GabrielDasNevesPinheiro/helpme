import * as z from "zod";

const companySchema = z.object({
    company: z.string({ required_error: "Insira o nome da sua Organização." }).min(3, {
        message: "Por favor, insira um valor válido"
    }).max(60, {
        message: "Você excedeu o limite de 60 caracteres"
    }),
});

const userSchema = z.object({
    code: z.string({ required_error: "Insira o código da organização." }).min(3, {
        message: "Por favor, insira um valor válido"
    }).max(6, {
        message: "O Código contém 6 caracteres"
    }).min(6, {
        message: "O Código contém 6 caracteres"
    }),
    sector: z.string({ required_error: "Selecione seu setor." }),
    level: z.string({ required_error: "Selecione sua função." })
});


const callSchema = z.object({
    description: z.string()
        .min(5, { message: "Descreva bem o problema..." })
        .max(300, { message: "Você ultrapassou o limite de caracteres." })
});

export { companySchema, userSchema, callSchema };