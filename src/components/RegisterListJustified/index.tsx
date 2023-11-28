import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../public/search'
import { Xicon } from '../../../public/xIcon'
import { CheckIcon } from '../../../public/checkIcon'
import { registers, registersJustified } from '@/api/db'
import { Input } from '../Input'

const RegisterListJustified = () => {
  const {user, setUser} = useContext(AppContext)
  const [userRegisters, setUserRegisters] = useState([])
  

  useEffect(() => {
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES JUSTIFICADOS</h1>
          <Input placeholder='Filtrar por Nome / Chamado' />
        </div>
        <DashboardWrapper>
            <li key='Header'>
              <span>Buscar no ServiceNow</span>
              <span>Nº do chamado</span>
              <span>Nº da TASK</span>
              <span>Data</span>
              <span>Nome do Analista</span>
            </li>
          {registersJustified.length > 0 ? registersJustified.map((register: any) => (
            <li key={register.number}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.number}`}><Search /></Link>
              <Link id={register.number} href={`./Dashboard/${register.number}`}>{register.number}</Link>
              <span>{register.task}</span>
              <span>{register.date}</span>
              <span>{register.user}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterListJustified