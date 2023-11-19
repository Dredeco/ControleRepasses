import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { UserFormBody, UserFormController, UserFormHeader, UserFormMain } from './styles'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { createUser, getUsers } from '@/api/userService'
import { Select } from '../Select'
import { AppContext } from '@/context/AppContext'

interface IUserForm extends FormEvent<HTMLFormElement> {}

const UserForm = () => {
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const {setPage} = useContext(AppContext)

  const roles = [
    {name: "Analista" },
    {name: "Supervisor"},
]

  useEffect(() => {
    getUsers()
    setRole('Analista')
  }, [])

  const handleSubmit = async (e: IUserForm) => {
    e.preventDefault()
    const user = {
      key,
      name,
      role
    }

    await createUser(user)
    setPage('home')
  }

  return (
    <UserFormMain>
      <UserFormController onSubmit={(e) => handleSubmit(e)}>
        <UserFormHeader>
          <h1>Dados do usuário</h1>
        </UserFormHeader>
        <UserFormBody>
          <li>
            <Input label='Chave' placeholder='XXXX' onChange={(e) => setKey(e.target.value)} required/>
          </li>
          <li>
            <Input label='Nome completo' placeholder='Maria José de Jesus' onChange={(e) => setName(e.target.value)} required/>
          </li>
          <li>
            <Select label='Função' options={roles} onChange={(e) => setRole(e.target.value)} required/>
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