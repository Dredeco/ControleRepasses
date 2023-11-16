import React, {AllHTMLAttributes, MouseEventHandler, useContext} from 'react'
import styled from 'styled-components'
import { SidebarMain } from './styles'
import { AppContext } from '@/context/AppContext'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

interface SidebarProps extends AllHTMLAttributes<HTMLLIElement> {
  handleClick: (value: string) => string | void
}

const Sidebar = (props: SidebarProps) => {
  const {setPage, user} = useContext(AppContext)
  const router = useRouter()
  
  const handleHome = () => {
    setPage("home")
  }

  const handleCreateRegister = () => {
    setPage("register")
  }

  const handleCreateuser = () => {
    setPage("newUser")
  }

  const logoff = () => {
    localStorage.setItem('user', JSON.stringify({}))
    router.push('/Login')
  }

  return (
    <SidebarMain>
        <ul>
            <li onClick={handleHome}>
              <strong>•</strong><span>
                  Início
                </span>
            </li>
            <li onClick={handleCreateRegister}>
            <strong>•</strong><span>
                Novo registro
              </span>
            </li>
            {user.key == 'AAXR' || user.role == 'Supervisor' ?
            <li onClick={handleCreateuser}>
            <strong>•</strong><span>
                Novo usuário
            </span>
            </li> :
              null
            }
            <li onClick={logoff}>
            <strong>•</strong><span>
                Sair
              </span>
            </li>
        </ul>
    </SidebarMain>
  )
}

export default Sidebar