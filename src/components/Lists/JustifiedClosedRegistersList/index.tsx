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
  const {filter} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array<Object>)
  

  useEffect(() => {
    const listaNaoJustificados = registers
    
    const getData =async () => {
      const listaJustificados = await getRegisters()
      const chamadosAtualizados: any[] = []
      const tempMap = new Map();

      listaJustificados.forEach((res: any) => {
        const key = res["numero_chamado"];
        if(!tempMap.has(key)) {
          tempMap.set(key, res)
        }
      });

      listaNaoJustificados.forEach((res: any) => {
        const key = res["numero_chamado"];
        if(tempMap.has(key)) {
          const mergedObj = {...tempMap.get(key), ...res}
          chamadosAtualizados.push(mergedObj)
        }
      })

      setChamadosJustificados(chamadosAtualizados)
  }
  getData()

    const getFilter = async () => {
      const result = await chamadosJustificados.filter((res: any) => res.numero.toLowerCase().includes(filter.toLowerCase()))
      setChamadosJustificados(result)
    }

    getFilter()
  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES ENCERRADOS ANALISADOS</h1>
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
            <li key={register.numero_chamado}>
              <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.numero_chamado}`}><Search /></Link>
              <Link id={register.numero_chamado} href={`./Dashboard/${register.task}`}>{register.task}</Link>
              <span>{register.task}</span>
              <span>{register.data_task.split("T")[0]}</span>
              <span>{register.analista_task}</span>
              <span>{register.justificativa}</span>
              <span>{register.analise_sniper}</span>
              <span>{register.analise_supervisor}</span>
            </li>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedClosedRegistersList