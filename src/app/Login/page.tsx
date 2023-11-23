'use client'
import React, { FormEvent, useContext, useState } from 'react'
import { LoginContainer, LoginMain } from './styles'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { getUser, login } from '@/api/userService'
import { redirect, useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'
import { json } from 'stream/consumers'

interface ILoginForm extends FormEvent<HTMLFormElement> {}

const Login = () => {
  const [registration, setRegistration] = useState('')
  const [password, setPassword] = useState('')
  const {setUser} = useContext(AppContext)
  const router = useRouter()
  

  const validateUser = async (e: ILoginForm) => {
    e.preventDefault()
    try{
      await login(registration, password)
      .then((res: any) => {
        if(res.nome) {
          setUser(res)
          localStorage.setItem('user', JSON.stringify(res))
          router.push("/Dashboard")
        }
      })
    } catch (error) {
      alert("Usuário não encontrado")
    }
  }

  return (
    <LoginMain>
      <LoginContainer onSubmit={(e) => validateUser(e)}>
        <label>Chave</label>
        <Input type='text' placeholder='XXXX' onChange={(e) => setRegistration(e.target.value)}/>
        <label>Senha</label>
        <Input type='password' placeholder='XXXX' onChange={(e) => setPassword(e.target.value)}/>
        <div>
          <Button>Entrar</Button>
        </div>
      </LoginContainer>
    </LoginMain>
  )
}

export default Login