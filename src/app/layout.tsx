import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Providers from './providers/Providers'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Helpme',
  description: 'Gerencie o suporte técnico em sua empresa do jeito certo. Conecte seus técnicos e funcionários na Helpme.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
