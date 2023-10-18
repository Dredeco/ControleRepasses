'use client'

import { createContext, useState } from "react"

export const AppContext = createContext({
    user: {
        _id: '',
        key: '',
        name: ''
    },
    setUser: (value: any) => {},
    page: '',
    setPage: (value: string) => {}
})

interface ProviderProps {
    children: any
}

export const AppContextProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string))
    const [page, setPage] = useState('home')

    return (
        <AppContext.Provider value={{user, setUser, page, setPage}}>
            {children}
        </AppContext.Provider>
    )
}