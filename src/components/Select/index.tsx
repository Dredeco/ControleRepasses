import React, { SelectHTMLAttributes, useState } from 'react'
import { SelectMain } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    options?: {name: string}[]
}

export const Select = (props: SelectProps) => {

  return (
    <SelectMain>
      {props.label ? <label>{props.label}:</label> : ''}
        <select {...props}>
          {props.options?.length ? 
            props.options.map((option) => (
              <option key={option.name} value={option.name}>{option.name}</option>
            ))
            :
            <option>Selecione uma opção</option>
          }
        </select>
    </SelectMain>
  )
}
