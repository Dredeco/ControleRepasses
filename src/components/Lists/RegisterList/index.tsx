import React, { useEffect, useState, useContext } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegistersNumber } from '@/api/RegisterService'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { AppContext } from '@/context/AppContext'
import { IUser } from '@/types/User'

const RegisterList = () => {
  const {filter, setFilter} = useContext(AppContext)
  const [chamadosNaoJustificados, setChamadosNaoJustificados] = useState(Array<Object>)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)
  const {user} = useContext(AppContext)

  useEffect(() => {
    const getData = async () => {
      const listaChamadosJustificados = await getRegistersNumber()
      const listaChamadosNaoJustificados = registers
      const chamadosDoAnalista = listaChamadosNaoJustificados.filter((chamado: any) => chamado.analista_task == user.nome) 
      const todosChamados = chamadosDoAnalista.filter((chamadosA: any) => 
        !listaChamadosJustificados.some((chamadosB: any) => 
          chamadosA.numero_chamado === chamadosB.numero_chamado
        )
      )
      setChamadosNaoJustificados(todosChamados)
    }
    getData()

    setTimeout(() => {
      const getFilter = async () => {
        const result = chamadosNaoJustificados.filter((res: any) => res.numero_chamado.toLowerCase().includes(filter.toLowerCase()))
        if(!result.length) {
          const result2 = chamadosNaoJustificados.filter((res: any) => res.analista_task.toLowerCase().includes(filter.toLowerCase()))
          setChamadosFiltrados(result2)
        } else {
          setChamadosFiltrados(result)
        }
      }
      getFilter()
    }, 1000)
  }, [filter])
  
  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES NÃO JUSTIFICADOS</h1>
          <Input onChange={(e) => setFilter(e.target.value)} placeholder='Filtrar por Nome / Chamado' />
        </div>
        <DashboardWrapper>
          <thead>
            <tr key='Header'>
              <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Nº da Task</th>
              <th>Status da Task</th>
              <th>Data</th>
              <th>Mesa da Task</th>
              <th>Nome do Analista</th>
            </tr>
          </thead>
          <tbody>
            {chamadosFiltrados.length > 0 ? chamadosFiltrados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
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
          chamadosNaoJustificados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.task} href={`./Dashboard/${chamado.task}`}>{chamado.task}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.mesa_task}</td>
              <td>{chamado.analista_task}</td>
            </tr>
          ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList