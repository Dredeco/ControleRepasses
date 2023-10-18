'use client'

import React from 'react'
import { HeaderContainer, HeaderMain } from './styles'
import Link from 'next/link'

const Header = () => {
  return (
    <HeaderMain>
        <HeaderContainer>
          <Link href="/">
            <h1>Controller</h1>
          </Link>
        </HeaderContainer>
    </HeaderMain>
  )
}

export default Header