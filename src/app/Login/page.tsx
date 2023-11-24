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
          console.log(res)
          const newUser = {
            id: res.id,
            key: res.tododeskData.chave,
            name: res.nome,
            supervisor: res.tododeskData.responsavel,
            team: res.tododeskData.equipe,
            role: res.tododeskData.funcao
          }

          localStorage.setItem('user', JSON.stringify(newUser))
          setUser(newUser)
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
        <Input type='text' placeholder='Matrícula' onChange={(e) => setRegistration(e.target.value)}/>
        <Input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
        <div>
          <Button>Entrar</Button>
        </div>
      </LoginContainer>
    </LoginMain>
  )
}

export default Login