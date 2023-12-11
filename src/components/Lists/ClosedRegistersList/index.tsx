import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { ClockIcon } from '../../../../public/icons/clockIcon'

const ClosedRegistersList = () => {
  const {user, setUser} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array)
  

  useEffect(() => {
    const getData =async () => {
      const listaJustificados = registers.filter((res) => res.status_task.includes("Resolvido"))
      setChamadosJustificados(listaJustificados)
    }
    
    getData()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES ENCERRADOS</h1>
          <Input placeholder='Filtrar por Nome / Chamado' />
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
            </tr>
          </thead>
          <tbody>
            {chamadosJustificados.length > 0 ? chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.task} href={`./Dashboard/${chamado.task}`}>{chamado.task}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.mesa_task}</td>
            </tr>
          )) :
          chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.task} href={`./Dashboard/${chamado.task}`}>{chamado.task}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.mesa_task}</td>
            </tr>
          ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default ClosedRegistersList