import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Helpme - SignIn',
    description: 'Acesse sua conta e experimente o serviço',
}


export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
