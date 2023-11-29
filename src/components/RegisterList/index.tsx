import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getRegistersNumber, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../public/search'
import { registers } from '@/api/db'
import { Input } from '../Input'

const RegisterList = () => {
  const [chamadosNaoJustificados, setChamadosNaoJustificados] = useState(Array<Object>)

  useEffect(() => {
    const getData = async () => {
      const listaChamadosJustificados = await getRegistersNumber()
      const listaChamadosNaoJustificados = registers

      const todosChamados = listaChamadosNaoJustificados.filter((chamadosA: any) => 
        !listaChamadosJustificados.some((chamadosB: any) => 
          chamadosA.numero === chamadosB.numero
          )
        )
        setChamadosNaoJustificados(todosChamados)
    }
    getData()
  })

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
              <span>Status</span>
              <span>Data</span>
              <span>Nome do Analista</span>
            </li>
          {chamadosNaoJustificados.length > 0 ? chamadosNaoJustificados.map((chamado: any) => (
            <li key={chamado.numero}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              <Link id={chamado.numero} href={`./Dashboard/${chamado.numero}`}>{chamado.numero}</Link>
              <span>{chamado.task}</span>
              <span>{chamado.status}</span>
              <span>{chamado.data.split("T")[0]}</span>
              <span>{chamado.analista}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList