'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('user')
            }
        }
        setIsLoading(false)
    }, [])

    const login = (userData) => {
        const userInfo = {
            ...userData,
            isLoggedIn: true
        }
        setUser(userInfo)
        localStorage.setItem('user', JSON.stringify(userInfo))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return (
        <UserContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            logout,
            updateUser,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within UserProvider')
    }
    return context
}

