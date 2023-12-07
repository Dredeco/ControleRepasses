"use client"

import React, { FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister, getRegisterByNumber, getRegisters, getRegistersNumber, updateRegister } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registers } from '@/api/db'
import { IUser } from '@/types/User'

const motivos = [
    {name: "Usuário solicitou realmente que fosse repassado o chamado"},
    {name: "Sistema Operacional com problemas não sendo possível solucionar."},
    {name: "Repasse realizado conforme o procedimento exige repasse."},
    {name: "Suporte exclusivo local em hardware de TI com defeito ou para substituição."},
    {name: "Suporte local exclusivo em hardware em Telecomunicações."},
    {name: "Fornecer suprimentos tais como papeis, cartuchos ou tonners."},
    {name: "Indisponibilidade do Bomgar."},
    {name: "Indisponibilidade recurso ou sistema (CAOS)"},
    {name: "Inviabilidade de atendimento remoto por lentidão excessiva."},
    {name: "Inviabilidade de atendimento remoto por causa de indisponbilidade da rede no usuário."}
]

const classificacoes = [
    {name: "Configurar / Atualizar"},
    {name: "Entregar / Fornecer"},
    {name: "Manifestação"},
    {name: "Orientar / Informar"},
    {name: "Reparar / Prover"},
    {name: "Transferir / Remanejar / Substituir"}
]

const aplicacao = [
    {name: "Aplicativos e Sistemas Diversos"},
    {name: "Impressora / Scanner"},
    {name: "Micro / Windows"},
    {name: "Ponto de Rede / Rede"},
    {name: "Periférico (Teclado / Mouse / Monitor / Diversos)"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const RegisterForm = (incidentNumber: any) => {
    const [chamado, setChamado] = useState(Object)
    const [classificacao, setClassificacao] = useState(classificacoes[0].name)
    const [sistema, setSistema] = useState(aplicacao[0].name)
    const [motivo, setMotivo] = useState(motivos[0].name)
    const [justificativa, setJustificativa] = useState('')
    const [analiseSupervisor, setAnaliseSupervisor] = useState('')
    const [analiseSniper, setAnaliseSniper] = useState('')
    const [analiseConclusao, setAnaliseConclusao] = useState('')
    const [corrigirArtigo, setCorrigirArtigo] = useState('')
    const [listaChamados, setListaChamados] = useState(Array<any> || null)

    const {user, setUser} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if(!user.nome) {
            const loggedUser: IUser = JSON.parse(localStorage.getItem("user") as string)
            setUser(loggedUser)
        }

        const getIncData = async () => {
            const chamados = await getRegisters()
            const actualIncident = await chamados.filter((res: any) => res.numero == incidentNumber.incidentNumber)
            console.log(actualIncident)
            setChamado(actualIncident[0])
            setJustificativa(actualIncident[0].justificativa)
        }

        getIncData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            numero: chamado.numero,
            task: chamado.task,
            sctask: chamado.sctask,
            data: chamado.data,
            mesaTarefa: chamado.mesaTarefa,
            mesaChamado: chamado.mesaChamado,
            status: chamado.status,
            analista: user.nome,
            equipe: user.equipe,
            supervisor: user.supervisor,
            classificacao: classificacao,
            sistema: sistema,
            motivo: motivo,
            corrigirArtigo: corrigirArtigo,
            justificativa: justificativa,
            analiseSupervisor: analiseSupervisor,
            analiseSniper: analiseSniper,
            analiseConclusao: analiseConclusao
        }

        if(listaChamados.length) {
            for(let i=0; i < listaChamados.length; i++){
                if(listaChamados[i].numero == chamado.numero){
                    updateRegister(register)
                } else {
                    createRegister(register)
                }
            }
        } else {
            createRegister(register)
        }

        alert("Chamado atualizado!")
        router.push("/Dashboard")
        //await updateRegister(register)
       // window.location.href = 'https://dredeco.github.io/ControleRepasses/Dashboard'
    }

  return (
    <>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
            <RegisterFormHeader>
                <h1>Dados do chamado: {chamado.numero}</h1>
            </RegisterFormHeader>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        value={chamado.numero}
                        disabled
                    />
                </li>
                {chamado.task ? 
                    <li>
                        <Input 
                            label='Nº da TASK' 
                            value={chamado.task}
                            disabled
                        />
                    </li>
                    :
                    <li>
                        <Input 
                            label='Nº da SCTASK (RITM)' 
                            value={chamado.sctask}
                            placeholder='SCTASKXXXX'
                        />
                    </li>}
                <li>
                    <Input 
                        label='Data' 
                        defaultValue={chamado.data}
                        type='date' 
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='analista' 
                        label='Nome do Analista' 
                        value={user.nome}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='equipe' 
                        label='Equipe' 
                        value={user.equipe}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='supervisor' 
                        label='Supervisor' 
                        value={user.supervisor}
                        disabled
                    />
                </li>
                <li>
                    <Select 
                        name='classificação' 
                        label='Classificação' 
                        options={classificacoes} 
                        value={classificacao}
                        onChange={(e) => setClassificacao(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Sistema, Aplicativo ou Hardware' 
                        options={aplicacao} 
                        value={sistema}
                        onChange={(e) => setSistema(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Motivo do repasse' 
                        options={motivos} 
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Justificativa do repasse:' 
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                    required
                    />
                </li>
                {user.funcao == "SUPERVISOR TÉCNICO" ? 
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={chamado.supervisorObservations}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    />
                </li>
                :
                <></>}
                {user.funcao == "SNIPER TÉCNICO" ? 
                <li>
                    <Textarea 
                    label='Análise do Sniper:' 
                    defaultValue={chamado.supervisorObservations}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    />
                </li>
                :
                <></>}
                {chamado.status == "Resolvido" || chamado.status == "Encerrado" ? <></> :
                <>
                <li>
                    <Textarea 
                    label='Análise de Conclusão:' 
                    defaultValue={chamado.supervisorObservations}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        name='corrigir artigo' 
                        label='Artigo a corrigir?' 
                        value={chamado.corrigirArtigo}
                        onChange={(e) => setCorrigirArtigo(e.target.value)}
                        disabled
                    />
                </li>
                </>}
                <div className='btnContainer'>
                    <Link className='cancel' href='./'>Cancelar</Link>
                    <Button type='submit' className='send'>Salvar</Button>
                </div>
            </RegisterFormBody>
        </RegisterFormController>
    </MainRegisterForm>
    </>
  )
}

export default RegisterForm