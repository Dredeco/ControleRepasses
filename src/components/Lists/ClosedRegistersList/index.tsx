import React, { useContext, useEffect, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { registers } from '@/api/db'
import { Input } from '../../Input'
import { getRegisters, getRegistersNumber } from '@/api/RegisterService'

const ClosedRegistersList = () => {
  const {user, setUser} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array)
  

  useEffect(() => {
    const listaNaoJustificados = registers
    const getData = async () => {
        const listaJustificados = await getRegisters()

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
        const filteredArray: any = [];
        tempMap.forEach((obj: any) => {
          // Filtrar objetos sem o atributo "analise_conclusao" ou que estejam vazios
          // e que tenham o atributo "status_chamado" como "Resolvido" ou "Encerrado"
          if (
            !obj.hasOwnProperty('analise_conclusao') 
            || obj.hasOwnProperty('analise_conclusao')
            && (obj['analise_conclusao'] == null)
            &&
            (obj['status_chamado'] === 'Resolvido' || obj['status_chamado'] === 'Encerrado')
          ) {
            filteredArray.push(obj);
          }
        });
      
        setChamadosJustificados(filteredArray);
      }
    getData()
  }, [])

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <h1>CHAMADOS NÃO ANALISADOS</h1>
          <Input placeholder='Filtrar por Nome / Chamado' />
        </div>
        <DashboardWrapper>
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
            <tr key={chamado.task}>
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
            <tr key={chamado.task}>
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

export default ClosedRegistersList