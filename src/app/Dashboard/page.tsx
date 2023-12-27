"use client"

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import ClosedRegisters from '@/components/SidebarPages/ClosedRegisters'
import InfoCards from '@/components/SidebarPages/InfoCards'
import Registers from '@/components/SidebarPages/Registers'
import Tasks from '@/components/SidebarPages/Tasks'

const DashboardMain = styled.div`
  width: 100vw;
  min-height: calc(100vh - 14rem);
  display: flex;
  background: #222;
  justify-content: center;
`

const Dashboard = () => {
  const {page, setPage, user} = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  
  
  useEffect(() => {
    if(user.nome) {
      setLoading(false)
    } else {
      router.push('/Login');
    }
  }, [])

  return (
    <DashboardMain>
        <Sidebar handleClick={setPage}/>
        {page == 'home' ? <Registers />
        : page == "register" ? <ClosedRegisters />
        : page == "task" ? <Tasks />
        : <InfoCards />
        }
    </DashboardMain>
  )
}

export default Dashboard


