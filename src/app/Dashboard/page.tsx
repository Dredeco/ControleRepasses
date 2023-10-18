'use client'

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegisterList from '../../pages/RegisterList'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import Home from '@/app/page'
import { RegisterForm } from '@/pages/RegisterForm'
import { AppContext } from '@/context/AppContext'
import router from 'next/router'
import { redirect } from 'next/navigation'

const DashboardMain = styled.div`
  width: 100%;
  min-height: calc(100vh - 14rem);
  display: flex;
`

const Dashboard = () => {
  const {page, setPage} = useContext(AppContext)
  const [LoggedUser, setLoggedUser] = useState(Object)
  const {user, setUser} = useContext(AppContext)
  
  
  useEffect(() => {
    const getUserData = async() => {
      const verifyUser: string | null = await localStorage.getItem('user')
      console.log(verifyUser)
      setUser(JSON.parse(verifyUser as string))
    }
    getUserData()
    
    
  }, [])
  
  if(!user.name) {
    redirect('/Login')
  }

  return (
    <DashboardMain>
        <Sidebar handleClick={setPage}/>
        {page == 'home' ? <RegisterList /> : <RegisterForm /> }
    </DashboardMain>
  )
}

export default Dashboard