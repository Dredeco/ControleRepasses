import React, { FormEvent, useEffect, useState } from 'react'
import { UserFormBody, UserFormController, UserFormHeader, UserFormMain } from './styles'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { createUser, getUsers } from '@/api/userService'

interface IUserForm extends FormEvent<HTMLFormElement> {}

const UserForm = () => {
  const [key, setKey] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  const handleSubmit = (e: IUserForm) => {
    e.preventDefault()
    const user = {
      key,
      name
    }
    createUser(user)
  }

  return (
    <UserFormMain>
      <UserFormController onSubmit={(e) => handleSubmit(e)}>
        <UserFormHeader>
          <h1>Dados do usuário</h1>
        </UserFormHeader>
        <UserFormBody>
          <li>
            <Input label='Chave' onChange={(e) => setKey(e.target.value)} required/>
          </li>
          <li>
            <Input label='Nome completo' onChange={(e) => setName(e.target.value)} required/>
          </li>
          <div className='btnContainer'>
              <Button className='cancel'>Cancelar</Button>
              <Button className='send'>Salvar</Button>
          </div>
        </UserFormBody>
      </UserFormController>
    </UserFormMain>
  )
}

export default UserForm