'use client'
import React, { FormEvent, useContext, useState } from 'react'
import { LoginContainer, LoginMain } from './styles'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { getUser, login } from '@/api/userService'
import { redirect, useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'
import { PersonIcon } from '../../../public/personIcon'
import { LockIcon } from '../../../public/lockIcon'

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
          const newUser = {
            id: res.id,
            chave: res.tododeskData.chave,
            nome: res.nome,
            supervisor: res.tododeskData.responsavel,
            equipe: res.tododeskData.equipe,
            funcao: res.tododeskData.funcao
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
        <PersonIcon />
        <Input type='text' placeholder='Matrícula' onChange={(e) => setRegistration(e.target.value)}/>
        <LockIcon />
        <Input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
        <div>
          <Button>Entrar</Button>
        </div>
      </LoginContainer>
    </LoginMain>
  )
}

export default Login