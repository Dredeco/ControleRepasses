import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { getRegisters, getRegistersNumber } from '@/api/RegisterService'
import { DownloadSheet } from '@/hooks/DownloadSheet'
import { SheetIcon } from '../../../../public/icons/sheetIcon'

const JustifiedRegistersList = () => {
  const [chamadosJustificados, setChamadosJustificados] = useState(Array)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<Object>)
  const tableRef = useRef(null)
  const {filter, setFilter, user} = useContext(AppContext)
  const filename = "Chamados justificados"
  

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
      const result = chamadosJustificados.filter((res: any) => res.numero_chamado.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = chamadosJustificados.filter((res: any) => res.analista_chamado.toLowerCase().includes(filter.toLowerCase()))
        setChamadosFiltrados(result2 as Object[])
      } else 
      setChamadosFiltrados(result as Object[])
    }
    getFilter()

  }, [filter])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <div className='title'>
            <h1>CHAMADOS JUSTIFICADOS |</h1>
            <button title={`${filename} - Exportar XLS`} onClick={DownloadSheet(tableRef.current, filename, filename)}><SheetIcon /></button>
          </div>
        </div>
        <DashboardWrapper ref={tableRef}>
        <thead>
            <tr key='Header'>
              <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Status</th>
              <th>Data</th>
              <th>Mesa da Tarefa</th>
              <th>Nome do Analista</th>
            </tr>
          </thead>
          <tbody>
            {chamadosJustificados.length > 0 ? chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>
              <Link id={chamado.numero_chamado} href={`./Dashboard/Chamado/${chamado.numero_chamado}`}>{chamado.numero_chamado}</Link>
              </td>
              <td>{chamado.status_chamado}</td>
              <td>{chamado.data_chamado}</td>
              <td>{chamado.mesa_chamado}</td>
              <td>{chamado.analista_chamado}</td>
            </tr>
          )) :
          chamadosJustificados.map((chamado: any) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>
              <Link id={chamado.numero_chamado} href={`./Dashboard/Chamado/${chamado.numero_chamado}`}>{chamado.numero_chamado}</Link>
              </td>
              <td>{chamado.task}</td>
              <td>{chamado.status_chamado}</td>
              <td>{chamado.data_task}</td>
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

export default JustifiedRegistersList