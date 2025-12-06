'use client'
import { DateProvider } from '../../lib/DateContext'
import { UserProvider } from '../../lib/UserContext'

export default function DateProviderWrapper({ children }) {
    return (
        <UserProvider>
            <DateProvider>{children}</DateProvider>
        </UserProvider>
    )
}

