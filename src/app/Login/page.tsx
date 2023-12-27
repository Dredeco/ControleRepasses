'use client'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'
import { login } from '@/api/userService'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { PersonIcon } from '../../../public/icons/personIcon'
import { LockIcon } from '../../../public/icons/lockIcon'
import { LoginContainer, LoginEmailWrapper, LoginMain, LoginPasswordWrapper } from './styles'

import LoginImage from '../../../public/login2.jpg'
import Image from 'next/image'

interface ILoginForm extends FormEvent<HTMLFormElement> {}

const Login = () => {
  const [registration, setRegistration] = useState('')
  const [password, setPassword] = useState('')
  const {setUser, user} = useContext(AppContext)
  const router = useRouter()
  
  //SUPERVISOR TÉCNICO

  useEffect(() => {
    if(user.nome){
      router.push("/Dashboard")
    }
  })

  const validateUser = async (e: ILoginForm) => {
    e.preventDefault()
    try{
      await login(registration, password)
      .then((res: any) => {
        console.log(res)
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
    <>
    <header>
      <title>Login - Controle de Repasses</title>
    </header>
    
    <LoginMain>
      <LoginContainer onSubmit={(e) => validateUser(e)}>
        <Image 
          src={LoginImage}
          alt='Image Login'
        />
        
        <LoginEmailWrapper>
          <PersonIcon />
          <Input type='text' placeholder='Matrícula' onChange={(e) => setRegistration(e.target.value)}/>
        </LoginEmailWrapper>

        <LoginPasswordWrapper>
          <LockIcon />
          <Input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
        </LoginPasswordWrapper>

        <Button>Entrar</Button>
      </LoginContainer>
    </LoginMain>
    </>
  )
}

export default Login