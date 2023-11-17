import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'

const RegisterList = () => {
  const {user, setUser} = useContext(AppContext)
  const [userRegisters, setUserRegisters] = useState([])
  

  useEffect(() => {
    if(user.name == '') {
      const LoggedUser = localStorage.getItem('user')
      setUser(JSON.parse(LoggedUser as string))
    }
    
    const getRegister = async() => {
      if(user.role == 'analista' || user.role == 'Analista') {
        await getUserRegisters(user.name)
        .then((e) => {
          setUserRegisters(e)
        })
      } else {
        const superList = await getRegisters()
        setUserRegisters(superList)
      }
    }
    getRegister()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <h1>Meus chamados</h1>
        <DashboardWrapper>
            <li key='Header'>
              <span>Nº do chamado</span>
              <span>Nº da TASK</span>
              <span>Nº do SCTASK</span>
              <span>Data</span>
              <span>Nome do Analista</span>
              <span>Supervisor</span>
              <span>Classificação</span>
              <span>Sistema, Aplicativo ou Hardware</span>
              <span>Procedimento a ser corrigido</span>
              <span>Observações</span>
              <span>Análise da Supervisão</span>
            </li>
          {userRegisters.length > 0 ? userRegisters.map((register: IRegister) => (
            <li key={register.number}>
              {user.role == "Supervisor" ? 
              <Link id={register.number} href={`./Dashboard/${register.number}`}>{register.number}</Link> : 
              <span>{register.number}</span>}
              <span>{register.number}</span>
              <span>{register.task}</span>
              <span>{register.sctask}</span>
              <span>{register.date}</span>
              <span>{register.user}</span>
              <span>{register.supervisor}</span>
              <span>{register.classification}</span>
              <span>{register.system}</span>
              <span>{register.fixProc}</span>
              <span>{register.observations}</span>
              <span>{register.supervisorObservations}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList