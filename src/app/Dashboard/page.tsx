"use client"

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegisterList from '../../components/RegisterList'
import RegisterForm from '@/components/RegisterForm'
import { AppContext } from '@/context/AppContext'
import { redirect, useRouter } from 'next/navigation'
import UserForm from '@/components/UserForm'
import RegisterListJustified from '@/components/Lists/JustifiedRegistersList'
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
        : page == 'newUser' ? 
        <UserForm /> 
        : 
        <ClosedRegisters />}
      </>}
    </DashboardMain>
  )
}

export default Dashboard