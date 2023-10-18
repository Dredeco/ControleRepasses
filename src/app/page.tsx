'use client'

import { useEffect, useState } from 'react'
import { getUsers } from '@/api/userService'
import styled from 'styled-components'
import Login from '@/app/Login/page'

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 14rem);
  `

export default function Home() {
  const [page, setPage] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    getUsers()
  }, [page])

  return (
    <MainContainer>
      {!isLoggedIn ? <Login /> : <div></div>   }
    </MainContainer>
  )
}
