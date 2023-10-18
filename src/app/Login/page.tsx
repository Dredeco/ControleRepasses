'use client'
import React, { FormEvent, useContext, useState } from 'react'
import { LoginContainer, LoginMain } from './styles'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { getUser } from '@/api/userService'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'

interface ILoginForm extends FormEvent<HTMLFormElement> {}

const Login = () => {
  const [userKey, setUserKey] = useState('')
  const {setUser} = useContext(AppContext)
  const router = useRouter()
  

  const validateUser = async (e: ILoginForm) => {
    e.preventDefault()
    try {      
      await getUser(userKey)
      .then((e) => {
        if(e.name) {
          setUser(e)
          console.log(e)
          localStorage.setItem('user', JSON.stringify(e))
          router.push('/Dashboard')
        }
      })
    } catch (error) {
      alert('Usuário não encontrado')
    }
  }

  return (
    <LoginMain>
      <LoginContainer onSubmit={(e) => validateUser(e)}>
        <h1>Informe a sua chave</h1>
        <Input type='text' placeholder='XXXX' onChange={(e) => setUserKey(e.target.value)}/>
        <div>
          <Button>Entrar</Button>
        </div>
      </LoginContainer>
    </LoginMain>
  )
}

export default Login