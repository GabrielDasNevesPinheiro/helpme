import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import AuthProvider from './providers/authProvider'
import { ThemeProvider } from './providers/themeProvider'
import { Toaster } from '@/components/ui/toaster'
import UserContextProvider from './providers/userContextProvider'

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
        <NextAuthSessionProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <UserContextProvider>
              <AuthProvider>
                {children}
                <Toaster />
              </AuthProvider>
            </UserContextProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
