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
  const [chamadosJustificados, setChamadosJustificados] = useState(Array<Object>)
  

  useEffect(() => {
    const getData =async () => {
      const listaJustificados = await getRegisters()
      setChamadosJustificados(listaJustificados)
    }

    const getFilter = async () => {
      const result = await chamadosJustificados.filter((res: any) => res.numero.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = await chamadosJustificados.filter((res: any) => res.analista.toLowerCase().includes(filter.toLowerCase()))
        setChamadosFiltrados(result2)
      } else 
      setChamadosFiltrados(result)
    }
    getFilter()

    getData()
  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES JUSTIFICADOS</h1>
        </div>
        <DashboardWrapper>
          <thead>
            <tr key='Header'>
              <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Nº da TASK</th>
              <th>Status</th>
              <th>Data</th>
              <th>Nome do Analista</th>
              <th>Mesa da Tarefa</th>
              <th>Sistema</th>
              <th>Motivo</th>
              <th>Justificativa</th>
              <th>Análise Sniper</th>
              <th>Análise Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {chamadosFiltrados.length > 0 ? chamadosFiltrados.map((chamado: any) => (
            <tr key={chamado.numero}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>{chamado.numero}</td>
              <td>
              <Link id={chamado.task} href={`./Dashboard/${chamado.task}`}>{chamado.task}</Link>
              </td>
              <td>{chamado.status}</td>
              <td>{chamado.data.split("T")[0]}</td>
              <td>{chamado.analista}</td>
              <td>{chamado.mesaTarefa}</td>
              <td>{chamado.sistema}</td>
              <td>{chamado.motivo}</td>
              <td>{chamado.justificativa}</td>
              {chamado.analiseSniper ?
              <td>{chamado.analiseSniper}</td>
              :
              <td>
                <ClockIcon />
                <p>Em análise</p>
              </td>}
              {chamado.analiseSupervisor ?
              <td>{chamado.analiseSupervisor}</td>
              :
              <td>
                <ClockIcon />
                <p>Em análise</p>
              </td>}
            </tr>
          )) :
          chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.numero}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>{chamado.numero}</td>
              <td>
              <Link id={chamado.task} href={`./Dashboard/${chamado.task}`}>{chamado.task}</Link>
              </td>
              <td>{chamado.status}</td>
              <td>{chamado.data.split("T")[0]}</td>
              <td>{chamado.analista}</td>
              <td>{chamado.mesaTarefa}</td>
              <td>{chamado.sistema}</td>
              <td>{chamado.motivo}</td>
              <td>{chamado.justificativa}</td>
              {chamado.analiseSniper ?
              <td>{chamado.analiseSniper}</td>
              :
              <td>
                <ClockIcon />
                <p>Em análise</p>
              </td>}
              {chamado.analiseSupervisor ?
              <td>{chamado.analiseSupervisor}</td>
              :
              <td>
                <ClockIcon />
                <p>Em análise</p>
              </td>}
            </tr>
          ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedRegistersList