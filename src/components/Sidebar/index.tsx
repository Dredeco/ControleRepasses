import React, {AllHTMLAttributes, MouseEventHandler, useContext} from 'react'
import styled from 'styled-components'
import { SidebarMain } from './styles'
import { AppContext } from '@/context/AppContext'

interface SidebarProps extends AllHTMLAttributes<HTMLLIElement> {
  handleClick: (value: string) => string | void
}

const Sidebar = (props: SidebarProps) => {
  const {setPage} = useContext(AppContext)

  const handleCreate = () => {
    setPage("create")
  }

  const handleHome = () => {
    setPage("home")
  }

  return (
    <SidebarMain>
        <ul>
            <li onClick={handleHome}>
              <strong>• </strong><span>
                  Início
                </span>
            </li>
            <li onClick={handleCreate}>
            <strong>• </strong><span>
                Novo cadastro
              </span>
            </li>
        </ul>
    </SidebarMain>
  )
}

export default Sidebar