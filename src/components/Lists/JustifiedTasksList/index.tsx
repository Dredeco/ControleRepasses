import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { getTasks } from '@/api/TarefaService'
import { DownloadSheet } from '@/hooks/DownloadSheet'
import { SheetIcon } from '../../../../public/icons/sheetIcon'


const JustifiedTaskList = () => {
  const {filter} = useContext(AppContext)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array<Object>)
  const filename = "Tarefas Justificadas"
  const tableRef = useRef(null)

  useEffect(() => {
    const listaNaoJustificados = registers
    
    const getData =async () => {
      const listaJustificados = await getTasks()
      const chamadosAtualizados: any[] = []
      const tempMap = new Map();

      listaJustificados.forEach((res: any) => {
        const key = res["tarefa"];
        if(!tempMap.has(key)) {
          tempMap.set(key, res)
        }
      });

      listaNaoJustificados.forEach((res: any) => {
        const key = res["tarefa"];
        if(tempMap.has(key)) {
          const mergedObj = {...tempMap.get(key), ...res}
          chamadosAtualizados.push(mergedObj)
        }
      })

      setChamadosJustificados(chamadosAtualizados)
  }
  getData()

    const getFilter = async () => {
      const result = await chamadosJustificados.filter((res: any) => res.tarefa.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = await chamadosJustificados.filter((res: any) => res.analista_task.toLowerCase().includes(filter.toLowerCase()))
        setChamadosFiltrados(result2)
      } else 
      setChamadosFiltrados(result)
    }
    getFilter()

  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>TAREFAS JUSTIFICADAS |</h1>
          <button title={`${filename} - Exportar XLS`} onClick={DownloadSheet(tableRef.current, filename, filename)}><SheetIcon /></button>
        </div>
        <DashboardWrapper ref={tableRef}>
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
            </tr>
          </thead>
          <tbody>
          {chamadosFiltrados.length > 0 ? chamadosFiltrados.map((chamado: any) => (
            <tr key={chamado.tarefa}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.tarefa} href={`./Dashboard/Task/${chamado.tarefa}`}>{chamado.tarefa}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.mesa_task}</td>
              <td>{chamado.sistema_task}</td>
              <td>{chamado.motivo_task}</td>
              <td>{chamado.justificativa_task}</td>
            </tr>
          )) :
          chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.tarefa}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>{chamado.numero_chamado}</td>
              <td>
              <Link id={chamado.tarefa} href={`./Dashboard/Task/${chamado.tarefa}`}>{chamado.tarefa}</Link>
              </td>
              <td>{chamado.status_task}</td>
              <td>{chamado.data_task.split("T")[0]}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.mesa_task}</td>
              <td>{chamado.sistema_task}</td>
              <td>{chamado.motivo_task}</td>
              <td>{chamado.justificativa_task}</td>
            </tr>
              ))}
              </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedTaskList