import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'

const RegisterList = () => {
  const [userRegisters, setUserRegisters] = useState(Object)
  const {user} = useContext(AppContext)

  useEffect(() => {
    const getRegisters = async() => {
      getUserRegisters(user.name)
      .then((e) => {
        setUserRegisters(e)
      })
    }

    getRegisters()
  }, [userRegisters.length])

  return (
    <DashboardMain>
      <DashboardContainer>
        <h1>Meus chamados</h1>
        <DashboardWrapper>
            <li key='Header'>
              <span>Nº do chamado</span>
              <span>Data</span>
              <span>Nome do Analista</span>
              <span>Supervisor</span>
              <span>Classificação</span>
              <span>Sistema, Aplicativo ou Hardware</span>
              <span>Motivo do repasse</span>
              <span>Procedimento a ser corrigido</span>
              <span>Observações</span>
            </li>
          {userRegisters.length > 0 ? userRegisters.map((register: IRegister) => (
            <li key={register.number}>
              <span>{register.number}</span>
              <span>{register.date}</span>
              <span>{register.user}</span>
              <span>{register.supervisor}</span>
              <span>{register.classification}</span>
              <span>{register.system}</span>
              <span>{register.motive}</span>
              <span>{register.fixProc}</span>
              <span>{register.observations}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList