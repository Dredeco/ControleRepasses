import React, { useEffect, useState, useContext, useRef } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { AppContext } from '@/context/AppContext'
import { getTasksNumbers } from '@/api/TarefaService'
import { SheetIcon } from '../../../../public/icons/sheetIcon'
import { DownloadSheet } from '@/hooks/DownloadSheet'

const TaskList = () => {
  const {filter, setFilter, user} = useContext(AppContext)
  const [chamadosNaoJustificados, setChamadosNaoJustificados] = useState(Array<Object>)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)
  const tableRef = useRef(null)
  const filename = "Tarefas não justificadas"

  useEffect(() => {
    const getData = async () => {
      const listaChamadosJustificados: [] = await getTasksNumbers()
      const listaChamadosNaoJustificados = registers
      const chamadosDoAnalista = listaChamadosNaoJustificados.filter((chamado: any) => chamado.analista_task == user.nome)
      const todosChamados = chamadosDoAnalista.filter((chamadosA: any) => 
        !listaChamadosJustificados.some((chamadosB: any) => 
          chamadosA.tarefa === chamadosB.tarefa
        )
      )
      setChamadosNaoJustificados(todosChamados)
      }
    getData()

    setTimeout(() => {
      const getFilter = async () => {
        const result = chamadosNaoJustificados.filter((res: any) => res.tarefa.toLowerCase().includes(filter.toLowerCase()))
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
          <div className='title'>
            <h1>TAREFAS NÃO JUSTIFICADAS |</h1>
            <button title={`${filename} - Exportar XLS`} onClick={DownloadSheet(tableRef.current, filename, filename)}><SheetIcon /></button>
          </div>

          <Input onChange={(e) => setFilter(e.target.value)} placeholder='Filtrar por Nome / Chamado' />
        </div>


        <DashboardWrapper ref={tableRef}>
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
            <tr key={chamado.tarefa}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.tarefa} href={`./Dashboard/Task/${chamado.tarefa}`}>{chamado.tarefa}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.mesa_task}</td>
            </tr>
          )) :
          chamadosNaoJustificados.map((chamado: any) => (
            <tr key={chamado.tarefa}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.tarefa} href={`./Dashboard/Task/${chamado.tarefa}`}>{chamado.tarefa}</Link>
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

export default TaskList