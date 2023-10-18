import React, { InputHTMLAttributes } from 'react'
import { InputMain } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = (props: InputProps) => {

  return (
    <InputMain>
    {props.label ? <label>{props.label}:</label> : ''}
      <input {...props} />
    </InputMain>
  )
}
