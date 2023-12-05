import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { Xicon } from '../../../../public/icons/xIcon'
import { CheckIcon } from '../../../../public/icons/checkIcon'
import { registers, registersJustified } from '@/api/db'
import { Input } from '../../Input'

const JustifiedClosedRegistersList = () => {
  const {user, setUser, filter, setFilter} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState([])
  

  useEffect(() => {
    const getData =async () => {
      const listaJustificados = await getRegisters()
      setChamadosJustificados(listaJustificados)
    }

    const getFilter = async () => {
      const result = await chamadosJustificados.filter((res: any) => res.numero.toLowerCase().includes(filter.toLowerCase()))
      setChamadosJustificados(result)
    }

    getData()
    getFilter()
  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES ENCERRADOS ANALISADOS</h1>
          <Input onChange={(e) => setFilter(e.target.value)} placeholder='Filtrar por Nome / Chamado' />
        </div>
        <DashboardWrapper>
            <li key='Header'>
              <span>Buscar no ServiceNow</span>
              <span>Nº do chamado</span>
              <span>Nº da TASK</span>
              <span>Data</span>
              <span>Nome do Analista</span>
              <span>Justificativa</span>
              <span>Análise Sniper</span>
              <span>Análise Supervisor</span>
            </li>
          {chamadosJustificados.length > 0 ? chamadosJustificados.map((register: any) => (
            <li key={register.numero}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.numero}`}><Search /></Link>
              <Link id={register.numero} href={`./Dashboard/${register.numero}`}>{register.numero}</Link>
              <span>{register.task}</span>
              <span>{register.data.split("T")[0]}</span>
              <span>{register.analista}</span>
              <span>{register.justificativa}</span>
              <span>{register.analiseSniper}</span>
              <span>{register.analiseSupervisor}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedClosedRegistersList