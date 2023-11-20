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
    if(user.name == '') {
      const LoggedUser = localStorage.getItem('user')
      setUser(JSON.parse(LoggedUser as string))
    }

    const getRegister = async() => {
      if(user.role == 'analista' || user.role == "Analista") {
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
              <span>Buscar no ServiceNow</span>
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
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.number}`}><Search /></Link>
              {user.role == "Supervisor" ? 
              <Link id={register.number} href={`./Dashboard/${register.number}`}>{register.number}</Link> : 
              <span>{register.number}</span>}
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