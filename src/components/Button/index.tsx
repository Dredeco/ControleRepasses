'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { ButtonMain } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  return (
    <ButtonMain>{props.children}</ButtonMain>
  )
}
