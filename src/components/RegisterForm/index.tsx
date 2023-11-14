import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister } from '@/api/RegisterService'
import { getUsers } from '@/api/userService'
import { AppContext } from '@/context/AppContext'

const classificacoes = [
    {name: "#000 - Situações em que nenhuma das opções abaixo se enquadra."},
    {name: "#RRP - Portal - Repasse realizado conforme o procedimento exige repasse."},
    {name: "#DRS - Desbloqueio e reativações de senha em sistemas que o procedimento exige repasse."},
    {name: "#H01 - Suporte necessário localmente de hardware para remanejar ou mover equipamentos de lugar."},
    {name: "#H03 - Suporte exclusivo local em hardware de TI com defeito ou para substituição."},
    {name: "#H04 - Suporte local exclusivo em hardware em Telecomunicações."},
    {name: "#H06 - Fornecer suprimentos tais como papeis, cartuchos ou tonners."},
    {name: "#I01 - Indisponibilidade do Bomgar."},
    {name: "#I02 - Indisponibilidade da Base de conhecimento."},
    {name: "#I03 - Indisponibilidade recurso ou sistema (necessidade repassar até termos o CAOS)"},
    {name: "#I04 - Inviabilidade de atendimento remoto por lentidão excessiva."},
    {name: "#I05 - Inviabilidade de atendimento remoto por causa de indisponbilidade da rede no usuário."},
    {name: "#PSO - Sistema Operacional com problemas não sendo possível solucionar."},
    {name: "#TLE - Transferir licenças de software entre equipamentos."},
    {name: "#USR - Usuário solicitou realmente que fosse repassado o chamado."},
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
    const [number, setNumber] = useState('')
    const [task, setTask] = useState('')
    const [sctask, setSctask] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [classification, setClassification] = useState(classificacoes[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [motive, setMotive] = useState('')
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
        }
        getData()
    }, [number])

    const handleSubmit = (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: number,
            task: task,
            sctask: sctask,
            date: date,
            user: user,
            supervisor: supervisor,
            classification: classification,
            system: system,
            fixProc: fixProc,
            observations: observations
        }
        createRegister(register)
        setPage('home')
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
                        placeholder='INC00000000'
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da TASK' 
                        placeholder='TASK0000000'
                        onChange={(e) => setTask(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        label='Nº da SCTASK (RITM)' 
                        placeholder='SCTASK00000'
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
                        defaultValue={users[0]?.name}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='supervisor' 
                        label='Supervisor' 
                        options={supers}
                        defaultValue={supers[0]?.name}
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