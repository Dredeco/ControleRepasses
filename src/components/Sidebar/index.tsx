import React, {AllHTMLAttributes, MouseEventHandler, useContext, useEffect} from 'react'
import { SidebarMain } from './styles'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

interface SidebarProps extends AllHTMLAttributes<HTMLLIElement> {
  handleClick: (value: string) => string | void
}

const Sidebar = (props: SidebarProps) => {
  const {page, setPage} = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if(page == "home"){
      document.getElementById("home")?.classList.add("selected")
    } else if(page == "register") {
      document.getElementById("conclusion")?.classList.add("selected")
    } else {
      document.getElementById("home")?.classList.add("selected")
    }
  }, [])
  
  const handleHome = () => {
    setPage("home")
    document.getElementById("home")?.classList.add("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("task")?.classList.remove("selected")
  }

  const handeTask = () => {
    setPage("task")
    document.getElementById("task")?.classList.add("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("home")?.classList.remove("selected")
  }

  const handleJustified = () => {
    setPage("register")
    document.getElementById("conclusion")?.classList.add("selected")
    document.getElementById("home")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("task")?.classList.remove("selected")
  }

  const handleInfo = () => {
    setPage("info")
    document.getElementById("info")?.classList.add("selected")
    document.getElementById("home")?.classList.remove("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("task")?.classList.remove("selected")
  }

  const logoff = async () => {
    localStorage.setItem('user', JSON.stringify({}))
    router.push("/")
  }

  return (
    <SidebarMain>
        <ul>
            <li onClick={handleHome}>
              <strong>»</strong><span id='home'>
                  Chamados
                </span>
            </li>
            <li onClick={handleJustified}>
            <strong>»</strong><span id="conclusion">
                Chamados Encerrados
              </span>
            </li>
            <li onClick={handeTask}>
              <strong>»</strong><span id='task'>
                  Tarefas
                </span>
            </li>
            <li onClick={handleInfo}>
            <strong>»</strong><span id="info">
                Dados da equipe
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