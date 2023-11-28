import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../public/search'
import { Xicon } from '../../../public/xIcon'
import { CheckIcon } from '../../../public/checkIcon'
import { registers } from '@/api/db'
import { Input } from '../Input'

const RegisterList = () => {
  const {user, setUser} = useContext(AppContext)
  const [userRegisters, setUserRegisters] = useState([])


  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES NÃO JUSTIFICADOS</h1>
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
          {registers.length > 0 ? registers.map((register: any) => (
            <li key={register.numero}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.number}`}><Search /></Link>
              <Link id={register.numero} href={`./Dashboard/${register.numero}`}>{register.numero}</Link>
              <span>{register.task}</span>
              <span>{register.data.split("T")[0]}</span>
              <span>{register.analista}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList