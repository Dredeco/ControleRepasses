"use client"

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import PassedOnRegisters from '@/components/PassedOnRegisters'
import ClosedRegisters from '@/components/ClosedRegisters'
import InfoCards from '@/components/InfoCards'

const DashboardMain = styled.div`
  width: 100%;
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
        {page == 'home' ?
        <PassedOnRegisters />
        : <>{page == "register" ? 
        <ClosedRegisters />
        : 
        <InfoCards />}</>
        }
    </DashboardMain>
  )
}

export default Dashboard