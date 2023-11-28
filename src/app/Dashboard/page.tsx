"use client"

import Sidebar from '@/components/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegisterList from '../../components/RegisterList'
import RegisterForm from '@/components/RegisterForm'
import { AppContext } from '@/context/AppContext'
import { redirect, useRouter } from 'next/navigation'
import UserForm from '@/components/UserForm'
import RegisterListJustified from '@/components/RegisterListJustified'

const DashboardMain = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 14rem);
  display: flex;
  background: #222;

  .list-container{
    row-gap: 1rem;
    width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
`

const Dashboard = () => {
  const {page, setPage} = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  
  
  useEffect(() => {
    const loggedUser: any = JSON.parse(localStorage.getItem("user") as string)
    if(loggedUser.name) {
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
        <div className='list-container'>
          <RegisterList /> 
          <RegisterListJustified />
        </div>
        : page == 'newUser' ? 
        <UserForm /> 
        : 
        <RegisterForm />}
      </>}
    </DashboardMain>
  )
}

export default Dashboard