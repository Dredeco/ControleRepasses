"use client"

import React, { FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister, getRegisterByNumber, updateRegister } from '@/api/RegisterService'
import { getUsers } from '@/api/userService'
import { AppContext } from '@/context/AppContext'
import Sidebar from '../Sidebar'
import Link from 'next/link'
import { RedirectType, redirect, useRouter } from 'next/navigation'
import { teams } from '../UserForm'

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
    {name: "Impressora/Scanner"},
    {name: "Micro/Windows"},
    {name: "Ponto de Rede/Rede"},
    {name: "Periférico (Teclado/Mouse/Monitor/Diversos)"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const RegisterFormSupervisor = (incidentNumber: any) => {
    const [users, setUsers] = useState(Object)
    const [supers, setSupers] = useState(Object)

    const [incident, setIncident] = useState(Object)
    const [number, setNumber] = useState('')
    const [task, setTask] = useState('')
    const [sctask, setSctask] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState('')
    const [team, setTeam] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [classification, setClassification] = useState(classificacao[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [fixProc, setFixProc] = useState('')
    const [observations, setObservations] = useState('')
    const [supervisorObservations, setSupervisorObservations] = useState('')

    const {setPage} = useContext(AppContext)

    useEffect(() => {
        const getIncData = async () => {
            let actualIncident = await getRegisterByNumber(incidentNumber.incidentNumber)
            setIncident(actualIncident)

            setNumber(actualIncident.number.toUpperCase())
            setTask(actualIncident.task.toUpperCase())
            setSctask(actualIncident.sctask.toUpperCase())
            setDate(actualIncident.date)
            setUser(actualIncident.user)
            setSupervisor(actualIncident.supervisor)
            setClassification(actualIncident.classification)
            setSystem(actualIncident.system)
            setFixProc(actualIncident.fixproc)
            setObservations(actualIncident.observations)
            setSupervisorObservations(actualIncident.supervisorObservations)
        }
        const getUsersData  = async () => {
            const data = await getUsers()
            let userData: any = []
            let superData: any = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].role == "Supervisor") {
                    superData.push(
                        JSON.parse(`{"name": "${data[i].name}"}`)
                    )
                } else {
                    userData.push(
                        JSON.parse(`{"name": "${data[i].name}"}`)
                    )
                }
            }
            setUsers(userData)
            
            setSupers(superData)
        }
        getUsersData()
        getIncData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: number,
            task: task,
            sctask: sctask,
            date: date,
            user: user,
            team: team,
            supervisor: supervisor,
            classification: classification,
            system: system,
            fixProc: fixProc,
            observations: observations,
            supervisorObservations: supervisorObservations
        }
        await updateRegister(register)
       // window.location.href = 'https://dredeco.github.io/ControleRepasses/Dashboard'
    }

  return (
    <>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
            <RegisterFormHeader>
                <h1>Dados do chamado: {incident.number}</h1>
            </RegisterFormHeader>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        defaultValue={incident.number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da TASK' 
                        defaultValue={incident.task}
                        placeholder='TASKXXXXXX'
                        onChange={(e) => setTask(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da SCTASK (RITM)' 
                        defaultValue={incident.sctask}
                        placeholder='SCTASKXXXX'
                        onChange={(e) => setSctask(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        label='Data' 
                        defaultValue={incident.date}
                        type='date' 
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='analista' 
                        label='Nome do Analista' 
                        value={user}
                        options={users}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='equipe' 
                        label='Equipe' 
                        options={teams}
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='supervisor' 
                        label='Supervisor' 
                        options={supers}
                        value={supervisor}
                        onChange={(e) => setSupervisor(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='classificação' 
                        label='Classificação' 
                        options={classificacao} 
                        defaultValue={incident.classification}
                        onChange={(e) => setClassification(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Sistema, Aplicativo ou Hardware' 
                        options={aplicacao} 
                        defaultValue={incident.system}
                        onChange={(e) => setSystem(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Artigo a ser corrigido?'
                        defaultValue={incident.fixProc}
                        placeholder='KP - Atender ...'
                        onChange={(e) => setFixProc(e.target.value)}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Motivo do repasse:' 
                    defaultValue={incident.observations}
                    onChange={(e) => setObservations(e.target.value)}
                    required
                    />
                </li>
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={incident.supervisorObservations}
                    onChange={(e) => setSupervisorObservations(e.target.value)}
                    />
                </li>
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