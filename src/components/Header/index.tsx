'use client'

import React from 'react'
import { HeaderContainer, HeaderMain } from './styles'
import Link from 'next/link'

const Header = () => {
  return (
    <HeaderMain>
        <HeaderContainer>
          <Link href="/Dashboard">
            <h1>Controle de Repasses</h1>
          </Link>
        </HeaderContainer>
    </HeaderMain>
  )
}

export default Header