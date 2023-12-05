import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { ClockIcon } from '../../../../public/icons/clockIcon'

const JustifiedRegistersList = () => {
  const {filter, setFilter} = useContext(AppContext)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)
  const [chamadosJustificados, setChamadosJustificados] = useState([])
  

  useEffect(() => {
    const getData =async () => {
      const listaJustificados = await getRegisters()
      setChamadosJustificados(listaJustificados)
    }

    const getFilter = async () => {
      const result = await chamadosJustificados.filter((res: any) => res.numero.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = await chamadosJustificados.filter((res: any) => res.analista.toLowerCase().includes(filter.toLowerCase()))
        console.log(result2)
        setChamadosFiltrados(result2)
      } else 
      setChamadosFiltrados(result)
    }
    getFilter()

    getData()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES JUSTIFICADOS</h1>
        </div>
        <DashboardWrapper>
            <tr key='Header'>
              <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Nº da TASK</th>
              <th>Data</th>
              <th>Nome do Analista</th>
              <th>Justificativa</th>
              <th>Análise Sniper</th>
              <th>Análise Supervisor</th>
            </tr>
          {chamadosJustificados.length > 0 ? chamadosJustificados.map((register: any) => (
            <tr key={register.numero}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${register.numero}`}><Search /></Link>
              </td>
              <td>
                <Link id={register.numero} href={`./Dashboard/${register.numero}`}>{register.numero}</Link>
              </td>
              <td>{register.task}</td>
              <td>{register.data.split("T")[0]}</td>
              <td>{register.analista}</td>
              <td>{register.justificativa}</td>
              {register.analiseSniper.length > 0 ? 
              <td>{register.analiseSniper}</td>
              :
              <td>
                <ClockIcon />
                <span>Em análise</span>
              </td>
              }
              {register.analiseSupervisor.length > 0 ?
              <td>{register.analiseSupervisor}</td>
              :
              <td>
                <ClockIcon />
                <span>Em análise</span>
              </td>
              }
            </tr>
          )) : <></>}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedRegistersList