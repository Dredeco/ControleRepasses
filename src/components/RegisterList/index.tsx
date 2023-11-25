import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../public/search'
import { revalidate } from '@/app/Dashboard/[incidentNumber]/page'

const RegisterList = () => {
  const {user, setUser} = useContext(AppContext)
  const [userRegisters, setUserRegisters] = useState([])
  

  useEffect(() => {
    const getAllRegister = async () => {
      const register = await getRegisters()
      setUserRegisters(register)
    }
    getAllRegister()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <h1>Repasses não justificados</h1>
        <DashboardWrapper>
            <li key='Header'>
              <span>Buscar no ServiceNow</span>
              <span>Nº do chamado</span>
              <span>Nº da TASK</span>
              <span>Nº do SCTASK</span>
              <span>Data</span>
              <span>Nome do Analista</span>
              <span>Equipe</span>
              <span>Supervisor</span>
              <span>Classificação</span>
              <span>Sistema, Aplicativo ou Hardware</span>
              <span>Procedimento a ser corrigido</span>
              <span>Observações</span>
              <span>Análise da Supervisão</span>
            </li>
          {userRegisters.length > 0 ? userRegisters.map((register: IRegister) => (
            <li key={register.number}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.number}`}><Search /></Link>
              <Link id={register.number} href={`./Dashboard/${register.number}`}>{register.number}</Link>
              <span>{register.task}</span>
              <span>{register.sctask}</span>
              <span>{register.date.split("T")[0]}</span>
              <span>{register.user}</span>
              <span>{register.team}</span>
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