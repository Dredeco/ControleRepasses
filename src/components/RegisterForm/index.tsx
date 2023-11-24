import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister } from '@/api/RegisterService'
import { getUsers } from '@/api/userService'
import { AppContext } from '@/context/AppContext'
import { teams } from '../UserForm'

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
    {name: "Impressora/Scanner"},
    {name: "Micro/Windows"},
    {name: "Ponto de Rede/Rede"},
    {name: "Periférico (Teclado/Mouse/Monitor/Diversos)"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const RegisterForm = () => {
    const { user } = useContext(AppContext)
    const [number, setNumber] = useState('')
    const [task, setTask] = useState('')
    const [sctask, setSctask] = useState('')
    const [date, setDate] = useState('')
    const [team, setTeam] = useState('')
    const [motive, setMotive] = useState(motives[0].name)
    const [supervisor, setSupervisor] = useState('')
    const [classification, setClassification] = useState(classificacao[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [fixProc, setFixProc] = useState('')
    const [observations, setObservations] = useState('')

    useEffect(() => {
        let myDate = new Date()
        setDate(myDate.toISOString().split("T")[0])
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: number.toUpperCase(),
            task: task.toUpperCase(),
            sctask: sctask.toUpperCase(),
            date: date,
            user: user.name,
            team: user.team,
            supervisor: user.supervisor,
            classification: classification,
            motive: motive,
            system: system,
            fixProc: fixProc,
            observations: observations
        }
        await createRegister(register)
        //setPage('home')
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Input 
                        name='analista' 
                        label='Nome do Analista' 
                        value={user.name}
                        required
                        readOnly
                    />
                </li>
                <li>
                    <Input 
                        name='equipe' 
                        label='Equipe' 
                        value={user.team}
                        required
                        readOnly
                    />
                </li>
                <li>
                    <Input 
                        name='supervisor' 
                        label='Supervisor' 
                        value={user.supervisor}
                        required
                        readOnly
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
                    <Select 
                        label='Motivo do repasse'
                        options={motives}
                        value={motive}
                        onChange={(e) => setMotive(e.target.value)}
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