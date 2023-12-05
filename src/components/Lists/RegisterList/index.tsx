import React, { useEffect, useState, useContext } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { getRegistersNumber } from '@/api/RegisterService'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { AppContext } from '@/context/AppContext'

const RegisterList = () => {
  const {filter, setFilter} = useContext(AppContext)
  const [chamadosNaoJustificados, setChamadosNaoJustificados] = useState(Array<Object>)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)

  useEffect(() => {
    const getData = async () => {
      const listaChamadosJustificados = await getRegistersNumber()
      const listaChamadosNaoJustificados = registers

      const todosChamados = listaChamadosNaoJustificados.filter((chamadosA: any) => 
        !listaChamadosJustificados.some((chamadosB: any) => 
          chamadosA.numero === chamadosB.numero
          )
        )
        setChamadosNaoJustificados(await todosChamados)
    }

    setTimeout(() => {
      const getFilter = async () => {
        const result = await chamadosNaoJustificados.filter((res: any) => res.numero.toLowerCase().includes(filter.toLowerCase()))
        if(!result.length) {
          const result2 = await chamadosNaoJustificados.filter((res: any) => res.analista.toLowerCase().includes(filter.toLowerCase()))
          console.log(result2)
          setChamadosFiltrados(result2)
        } else 
        setChamadosFiltrados(result)
      }
      getFilter()
    }, 1000)
    

    getData()
  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>REPASSES NÃO JUSTIFICADOS</h1>
          <Input onChange={(e) => setFilter(e.target.value)} placeholder='Filtrar por Nome / Chamado' />
        </div>
        <DashboardWrapper>
            <tr key='Header'>
              <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Nº da TASK</th>
              <th>Status</th>
              <th>Data</th>
              <th>Nome do Analista</th>
            </tr>
            {chamadosFiltrados.length > 0 ? chamadosFiltrados.map((chamado: any) => (
            <tr key={chamado.numero}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>
                <Link id={chamado.numero} href={`./Dashboard/${chamado.numero}`}>{chamado.numero}</Link>
              </td>
              <td>{chamado.task}</td>
              <td>{chamado.status}</td>
              <td>{chamado.data.split("T")[0]}</td>
              <td>{chamado.analista}</td>
            </tr>
          )) :
          chamadosNaoJustificados.map((chamado: any) => (
            <tr key={chamado.numero}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>
                <Link id={chamado.numero} href={`./Dashboard/${chamado.numero}`}>{chamado.numero}</Link>
              </td>
              <td>{chamado.task}</td>
              <td>{chamado.status}</td>
              <td>{chamado.data.split("T")[0]}</td>
              <td>{chamado.analista}</td>
            </tr>
          ))}
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegisterList