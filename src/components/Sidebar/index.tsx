import React, {AllHTMLAttributes, MouseEventHandler, useContext, useEffect} from 'react'
import { SidebarMain } from './styles'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

interface SidebarProps extends AllHTMLAttributes<HTMLLIElement> {
  handleClick: (value: string) => string | void
}

const Sidebar = (props: SidebarProps) => {
  const {page, setPage, user} = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if(page == "home"){
      document.getElementById("home")?.classList.add("selected")
    } else {
      document.getElementById("conclusion")?.classList.add("selected")
    }
  }, [])
  
  const handleHome = () => {
    setPage("home")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("home")?.classList.add("selected")
  }

  const handleCreateRegister = () => {
    setPage("register")
    document.getElementById("home")?.classList.remove("selected")
    document.getElementById("conclusion")?.classList.add("selected")
  }

  const logoff = () => {
    localStorage.setItem('user', JSON.stringify({}))
    router.push("/Login")
  }

  return (
    <SidebarMain>
        <ul>
            <li onClick={handleHome}>
              <strong>»</strong><span id='home'>
                  Início
                </span>
            </li>
            <li onClick={handleCreateRegister}>
            <strong>»</strong><span id="conclusion">
                Análise de conclusão
              </span>
            </li>
            <li onClick={logoff}>
            <strong>»</strong><span>
                Sair
              </span>
            </li>
        </ul>
    </SidebarMain>
  )
}

export default Sidebar