"use client"

import React, { FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { getRegisterByNumber, updateRegister } from '@/api/RegisterService'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { RedirectType, redirect, useRouter } from 'next/navigation'
import { teams } from '../UserForm'
import { registers, registersJustified } from '@/api/db'

const motives = [
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

const classificacao = [
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

const RegisterFormSupervisor = (incidentNumber: any) => {
    const [incident, setIncident] = useState(Object)
    const [classification, setClassification] = useState(classificacao[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [motive, setMotive] = useState(motives[0].name)
    const [observations, setObservations] = useState('')
    const [supervisorObservations, setSupervisorObservations] = useState('')

    const {user} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const getIncData = async () => {
            let actualIncident = registers.filter((res) => res.numero == incidentNumber.incidentNumber)
            setIncident(actualIncident[0])
        }
        getIncData()
        setObservations(incident.observations)
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: incident.numero,
            task: incident.task,
            sctask: incident.sctask,
            date: incident.data,
            user: user.name,
            team: user.team,
            supervisor: user.supervisor,
            classification: classification,
            system: system,
            motive: motive,
            observations: observations,
            supervisorObservations: supervisorObservations
        }

        registersJustified.push(register)
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
                <h1>Dados do chamado: {incident.numero}</h1>
            </RegisterFormHeader>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        value={incident.numero}
                        disabled
                    />
                </li>
                {incident.task ? 
                    <li>
                        <Input 
                            label='Nº da TASK' 
                            value={incident.task}
                            disabled
                        />
                    </li>
                    :
                    <li>
                        <Input 
                            label='Nº da SCTASK (RITM)' 
                            value={incident.sctask}
                            placeholder='SCTASKXXXX'
                        />
                    </li>}
                <li>
                    <Input 
                        label='Data' 
                        defaultValue={incident.data}
                        type='date' 
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='analista' 
                        label='Nome do Analista' 
                        value={user.name}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='equipe' 
                        label='Equipe' 
                        value={user.team}
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
                        options={classificacao} 
                        value={classification}
                        onChange={(e) => setClassification(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Sistema, Aplicativo ou Hardware' 
                        options={aplicacao} 
                        value={incident.system}
                        onChange={(e) => setSystem(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Motivo do repasse' 
                        options={motives} 
                        defaultValue={motives[0].name}
                        onChange={(e) => setMotive(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Textarea 
                    label='Justificativa do repasse:' 
                    defaultValue={incident.observations}
                    onChange={(e) => setObservations(e.target.value)}
                    required
                    />
                </li>
                {user.role == "OPERADOR TECNICO" ? <></> :
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={incident.supervisorObservations}
                    onChange={(e) => setSupervisorObservations(e.target.value)}
                    />
                </li>}
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

export default RegisterFormSupervisor