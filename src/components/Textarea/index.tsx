import React, { TextareaHTMLAttributes } from 'react'
import { TextareaMain } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

export const Textarea = (props: TextareaProps) => {
  return (
    <TextareaMain>
        <label>{props.label}</label>
        <textarea {...props}></textarea>
    </TextareaMain>
  )
}
