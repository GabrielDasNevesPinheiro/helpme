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

export { companySchema, userSchema };