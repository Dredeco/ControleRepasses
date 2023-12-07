"use client"

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/User'
import PassedOnRegisters from '@/components/PassedOnRegisters'
import ClosedRegisters from '@/components/ClosedRegisters'

const DashboardMain = styled.div`
  width: 100%;
  min-height: calc(100vh - 14rem);
  display: flex;
  background: #222;
`

const Dashboard = () => {
  const {page, setPage} = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  
  
  useEffect(() => {
    const loggedUser: IUser = JSON.parse(localStorage.getItem("user") as string)
    if(loggedUser.nome) {
      setLoading(false)
    } else {
      router.push('/Login');
    }
  }, [])

  return (
    <DashboardMain>
      {isLoading == true ? <div>Loading</div> : 
      <>
        <Sidebar handleClick={setPage}/>
        {page == 'home' ?
        <PassedOnRegisters />
        : 
        <ClosedRegisters />}
      </>}
    </DashboardMain>
  )
}

export default Dashboard