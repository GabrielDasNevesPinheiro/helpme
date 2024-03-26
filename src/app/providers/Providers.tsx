import { FC } from 'react'
import NextAuthSessionProvider from './sessionProvider'
import { ThemeProvider } from './themeProvider'
import UserContextProvider from './userContextProvider'
import { Toaster } from '@/components/ui/toaster'
import SocketProvider from './socketProvider'

interface globalProviderProps {
    children: React.ReactNode
}

const Providers: FC<globalProviderProps> = ({ children }) => {
    return (
        <NextAuthSessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                <UserContextProvider>
                    {children}
                    <Toaster />
                    <SocketProvider />
                </UserContextProvider>
            </ThemeProvider>
        </NextAuthSessionProvider>
    )
}

export default Providers