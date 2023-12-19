import { getRegisters } from '@/api/RegisterService'
import { getTasks } from '@/api/TarefaService'
import { registers } from '@/api/db'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const InfoCardsMain = styled.section`
    width: 100%;
    padding: 2% 0;
`

export const InfoCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 1.5rem;
`

export const InfoCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(89, 57, 175, 0.8);
    color: white;
    width: 30%;
    min-height: 150px;
    text-align: center;
    padding: 2rem 0;
    border-radius: 10px;
    gap: 1rem;
    h1{
        font-size: 2.5rem;
        text-transform: uppercase;
    }
    span{
        font-size: 6rem;
    }
`


const InfoCards = () => {
    const [totalRepasses, setTotalRepasses] = useState(Number)
    const [totalJustificados, setTotalJustificados] = useState(Number)
    const [totalIndevidos, setTotalIndevidos] = useState(Number)
    const [totalTarefasJustificadas, setTarefasJustificadas] = useState(Number)

    useEffect(() => {
        const getData = async () => {
            const ChamadosSN = registers
            const ChamadosJustificados = await getRegisters()
            const TarefasJustificadas = await getTasks()

            setTotalRepasses(ChamadosSN.length)
            setTarefasJustificadas(TarefasJustificadas.length)
            setTotalJustificados(ChamadosJustificados.length)
            
        }
        getData()
    }, [])

    return (
        <InfoCardsMain>
            <InfoCardContainer>
                <InfoCard>
                    <h1>Total de Repasses</h1>
                    <span>{totalRepasses}</span>
                </InfoCard>

                <InfoCard>
                    <h1>Tarefas Justificadas</h1>
                    <span>{totalTarefasJustificadas}</span>
                </InfoCard>

                <InfoCard>
                    <h1>Chamados Justificados</h1>
                    <span>{totalJustificados}</span>
                </InfoCard>

                <InfoCard>
                    <h1>Chamados não justificados</h1>
                    <span>53</span>
                </InfoCard>
            </InfoCardContainer>
        </InfoCardsMain>
    )
}

export default InfoCards