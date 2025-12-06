'use client'
import { createContext, useContext, useState } from 'react'

const DateContext = createContext()

export function DateProvider({ children }) {
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    
    const today = new Date().toISOString().split('T')[0]
    const datesSelected = pickupDate && returnDate && returnDate >= pickupDate
    
    return (
        <DateContext.Provider value={{
            pickupDate,
            returnDate,
            setPickupDate,
            setReturnDate,
            today,
            datesSelected
        }}>
            {children}
        </DateContext.Provider>
    )
}

export function useDateContext() {
    const context = useContext(DateContext)
    if (!context) {
        throw new Error('useDateContext must be used within DateProvider')
    }
    return context
}

