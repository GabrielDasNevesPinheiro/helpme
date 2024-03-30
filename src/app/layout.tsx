import './globals.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import Providers from './providers/Providers'
import { SpeedInsights } from "@vercel/speed-insights/next"

const font = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Helpme',
  description: 'Gerencie o suporte técnico em sua empresa do jeito certo. Conecte seus técnicos e funcionários na Helpme.',
  authors: {
    name: "Gabriel das Neves Pinheiro",
    url: "https://www.linkedin.com/in/gabriel-pinheiro-71497722b/"
  },
  applicationName: "Helpme",
  creator: "Gabriel das Neves Pinheiro",
  keywords: ["Helpme", "IT", "Support", "Tech", "IT Support Software", "Software"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
