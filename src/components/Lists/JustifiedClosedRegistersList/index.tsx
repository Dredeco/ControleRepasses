import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { getRegisters, getRegistersNumber } from '@/api/RegisterService'
import { SheetIcon } from '../../../../public/icons/sheetIcon'
import { DownloadSheet } from '@/hooks/DownloadSheet'

const JustifiedClosedRegistersList = () => {
  const {user, setUser} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array)
  const tableRef = useRef(null)
  const filename = "Chamados analisados"
  

  useEffect(() => {
    const listaNaoJustificados = registers
    const getData = async () => {
        const listaJustificados = await getRegisters()

        const mergedArray: any = [];

        // Criar um mapa temporário para armazenar objetos de ambos os arrays com base no atributo principal
        const tempMap = new Map();
      
        // Adicionar objetos do array1 ao mapa
        listaJustificados.forEach((obj: any) => {
          const key = obj["numero_chamado"];
          if (!tempMap.has(key)) {
            tempMap.set(key, { ...obj });
          } else {
            // Combinar atributos do objeto duplicado
            tempMap.set(key, { ...tempMap.get(key), ...obj });
          }
        });
      
        // Adicionar objetos do array2 ao mapa
        listaNaoJustificados.forEach((obj: any) => {
          const key = obj["numero_chamado"];
          if (!tempMap.has(key)) {
            tempMap.set(key, { ...obj });
          } else {
            // Combinar atributos do objeto duplicado
            tempMap.set(key, { ...tempMap.get(key), ...obj });
          }
        });
      
        // Converter o mapa de volta para um array e filtrar objetos sem "analise_conclusao"
        tempMap.forEach(obj => {
          // Filtrar objetos com o atributo "analise_conclusao" preenchido
          if (obj.hasOwnProperty('analise_conclusao') && obj['analise_conclusao'] !== '' && obj['analise_conclusao'] !== null) {
            mergedArray.push(obj);
          }
        });
      
        setChamadosJustificados(mergedArray);
      }
    getData()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>CHAMADOS ANALISADOS |</h1>
          <button title={`${filename} - Exportar XLS`} onClick={DownloadSheet(tableRef.current, filename, filename)}><SheetIcon /></button>
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
              <th>Análise da Conclusão</th>
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
              <td>{chamado.analise_conclusao}</td>
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
              <td>{chamado.mesa_task}</td>
              <td>{chamado.analista_task}</td>
              <td>{chamado.analise_conclusao}</td>
            </tr>
          ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default JustifiedClosedRegistersList