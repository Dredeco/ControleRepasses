'use client'

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegisterList from '../../components/RegisterList'
import RegisterForm from '@/components/RegisterForm'
import { AppContext } from '@/context/AppContext'
import { redirect } from 'next/navigation'
import UserForm from '@/components/UserForm'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'

const DashboardMain = styled.div`
  width: 100%;
  min-height: calc(100vh - 14rem);
  display: flex;
`

const Dashboard = () => {
  const {page, setPage} = useContext(AppContext)
  const {user, setUser} = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  
  
  useEffect(() => {
    if(user.name) {
      setLoading(false)
    } else {
      setUser(JSON.parse(localStorage.getItem('user') as string))
    }
  }, [user])
  
  if(!user) {
    redirect('/Login')
  }

  return (
    <DashboardMain>
      {isLoading == true ? <div>Loading</div> : 
      <>
        <Sidebar handleClick={setPage}/>
        {page == 'home' ? <RegisterList /> : page == 'newUser' ? <UserForm /> :
        page == 'register' && user.role == 'Supervisor' ? <RegisterFormSupervisor /> : <RegisterForm />}
      </>}
    </DashboardMain>
  )
}

export default Dashboard