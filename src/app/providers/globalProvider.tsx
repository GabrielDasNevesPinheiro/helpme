import { FC } from 'react'
import NextAuthSessionProvider from './sessionProvider'
import { ThemeProvider } from './themeProvider'
import UserContextProvider from './userContextProvider'
import AuthProvider from './authProvider'
import { Toaster } from '@/components/ui/toaster'

interface globalProviderProps {
    children: React.ReactNode
}

const GlobalProvider: FC<globalProviderProps> = ({ children }) => {
    return (
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
    )
}

export default GlobalProvider