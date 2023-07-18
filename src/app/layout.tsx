import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import AuthProvider from './providers/authProvider'
import { ThemeProvider } from './providers/themeProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dynamic title', // deve ser modificado futuramente
  description: 'thinking yet',
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
            <AuthProvider>
              {children}
              <Toaster/>
            </AuthProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
        </body>
    </html>
  )
}
