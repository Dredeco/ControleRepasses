import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister } from '@/api/RegisterService'
import { getUsers } from '@/api/userService'
import { AppContext } from '@/context/AppContext'
import { generateStaticParams } from '@/app/Dashboard/[incidentNumber]/page'

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

const RegisterForm = () => {
    const [number, setNumber] = useState('')
    const [task, setTask] = useState('')
    const [sctask, setSctask] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [classification, setClassification] = useState(classificacao[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [fixProc, setFixProc] = useState('')
    const [observations, setObservations] = useState('')
    const [users, setUsers] = useState(Object)
    const [supers, setSupers] = useState(Object)
    const {setPage} = useContext(AppContext)

    useEffect(() => {
        const getData  = async () => {
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
            setUser(userData[0].name)
            
            setSupers(superData)
            setSupervisor(superData[0].name)
        }
        getData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: number.toUpperCase(),
            task: task.toUpperCase(),
            sctask: sctask.toUpperCase(),
            date: date,
            user: user,
            supervisor: supervisor,
            classification: classification,
            system: system,
            fixProc: fixProc,
            observations: observations
        }
        await createRegister(register)
        generateStaticParams()
        setPage('home')
        window.location.reload
    }

  return (
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
            <RegisterFormHeader>
                <h1>Dados do chamado</h1>
            </RegisterFormHeader>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado' 
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder='INC / RITM'
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da TASK' 
                        placeholder='TASKXXXXXX'
                        onChange={(e) => setTask(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da SCTASK (RITM)' 
                        placeholder='SCTASKXXXX'
                        onChange={(e) => setSctask(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        label='Data' 
                        type='date' 
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='analista' 
                        label='Nome do Analista' 
                        options={users}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
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
                        onChange={(e) => setClassification(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Sistema, Aplicativo ou Hardware' 
                        options={aplicacao} 
                        onChange={(e) => setSystem(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Artigo a ser corrigido?'
                        placeholder='KP - Atender ...'
                        onChange={(e) => setFixProc(e.target.value)}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Motivo do repasse:' 
                    onChange={(e) => setObservations(e.target.value)}
                    required
                    />
                </li>
                <div className='btnContainer'>
                    <Button className='cancel'>Cancelar</Button>
                    <Button className='send'>Salvar</Button>
                </div>
            </RegisterFormBody>
        </RegisterFormController>
    </MainRegisterForm>
  )
}

export default RegisterForm