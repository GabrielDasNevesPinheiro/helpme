import LoginPage from "./LoginPage"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Helpme - SignIn',
    description: 'Acesse sua conta e experimente o serviço',
}

export default function Login() {
    return (<LoginPage />)
}