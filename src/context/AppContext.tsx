'use client'

import { IUser } from "@/types/User"
import { once } from "events"
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext({
    user: {
        _id: '',
        chave: '',
        nome: '',
        funcao: '',
        equipe: '',
        supervisor: ''
    },
    setUser: (value: any) => {},
    page: '',
    setPage: (value: string) => {}
})

interface ProviderProps {
    children: any
}

export const AppContextProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState(Object)
    const [page, setPage] = useState('home')

    useEffect(() => {
        const LoggedUser = localStorage.getItem('user')
        if(LoggedUser) {
            setUser(LoggedUser)
        }
    }, [])
    
    return (
        <AppContext.Provider value={{user, setUser, page, setPage}}>
            {children}
        </AppContext.Provider>
    )
}