import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { createRegister, getRegisters } from '@/api/RegisterService'
import { getUsers } from '@/api/userService'
import { AppContext } from '@/context/AppContext'

const supervisores = [
    {name: "Thayana Cristina Santos da Silva" },
    {name: "Libia"},
    {name: "Larissa"}
]

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

const aplicacao = [
    {name: "Aplicativos e Sistemas Diversos"},
    {name: "Impressora/Scanner"},
    {name: "Micro/Windows"},
    {name: "Ponto de Rede/Rede"},
    {name: "Periférico (Teclado/Mouse/Monitor/Diversos)"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

export const RegisterForm = () => {
    const [number, setNumber] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState('')
    const [supervisor, setSupervisor] = useState(supervisores[0].name)
    const [classification, setClassification] = useState(classificacoes[0].name)
    const [system, setSystem] = useState(aplicacao[0].name)
    const [motive, setMotive] = useState('')
    const [fixProc, setFixProc] = useState('')
    const [observations, setObservations] = useState('')
    const [users, setUsers] = useState(Object)
    const {setPage} = useContext(AppContext)

    useEffect(() => {
        const getData  = async () => {
            const data = await getUsers()
            let allData: any = []
            for(let i = 0; i < data.length; i++) {
                allData.push(JSON.parse(`{
                    "name": "${data[i].name}"
                }`))
            }
            setUsers(allData)
            setUser(allData[0].name)
        }

        getData()
    }, [])

    const handleSubmit = (e: IRegisterForm) => {
        e.preventDefault()
        const register = {
            number: number,
            date: date,
            user: user,
            supervisor: supervisor,
            classification: classification,
            system: system,
            motive: motive,
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
                        label='Nº do chamado' 
                        onChange={(e) => setNumber(e.target.value)}
                        required
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
                        onEmptied={() => setUser(users[0]?.name)}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='supervisor' 
                        label='Supervisor' 
                        options={supervisores} 
                        onChange={(e) => setSupervisor(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        name='classificação' 
                        label='Classificação' 
                        options={classificacoes} 
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
                        label='Motivo do repasse' 
                        onChange={(e) => setMotive(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Input 
                        label='Procedimento a ser corrigido?'
                        onChange={(e) => setFixProc(e.target.value)}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Observações' 
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