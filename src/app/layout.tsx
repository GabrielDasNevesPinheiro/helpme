import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import GlobalProvider from './providers/globalProvider'

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
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
