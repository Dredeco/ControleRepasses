"use client"

import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { Textarea } from '@/components/Textarea'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registers } from '@/api/db'
import { createTarefa, getTasks, updateTarefa } from '@/api/TarefaService'
import { ITarefa } from '@/types/Tarefa'

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const RegisterFormTask = (numeroTask: any) => {
    const [id, setID] = useState('')
    const [chamado, setChamado] = useState(Object)
    const [tarefa, setTarefa] = useState(Object)
    const [data, setData] = useState('' || undefined)
    const [justificativa, setJustificativa] = useState('')
    const [novoChamado, setNovoChamado] = useState(Boolean)

    const {user, setUser} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const ChamadosSeviceNow = registers
        const getIncData = async () => {
            if(user.nome === undefined) {
                setUser(JSON.parse(localStorage.getItem("user") as string))
            }
            
            const chamadosSalvos = await getTasks()

            const objetoArray1 = ChamadosSeviceNow.find((objeto: any) => objeto["tarefa"] == numeroTask.numeroTask);
            const novaTarefa: ITarefa = {
                numero_chamado: objetoArray1?.numero_chamado || '',
                tarefa: objetoArray1?.tarefa || '',
                analista_task: objetoArray1?.analista_task || '',
                equipe_task: user.equipe || '',
                data_task: objetoArray1?.data_task || '',
                mesa_task: objetoArray1?.mesa_task || '',
            }
            setTarefa(novaTarefa)
            
            const objetoArray2 = chamadosSalvos.find((objeto: any) => objeto["tarefa"] == numeroTask.numeroTask);
            if(objetoArray2 == null) {
                setNovoChamado(true)
            } else {
                setNovoChamado(false)
            }

            // Combina os atributos dos dois objetos, evitando duplicatas
            const atributosCombinados = { ...objetoArray1, ...objetoArray2 };

            // Remover atributos duplicados
            const atributosUnicos: any = {};
            Object.keys(atributosCombinados).forEach(key => {
                atributosUnicos[key] = atributosCombinados[key];
            });

            setChamado(atributosUnicos);
            if(atributosUnicos.id){
                setID(atributosUnicos.id)
                setJustificativa(atributosUnicos.justificativa_task)       
            }
        }
        getIncData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const task: ITarefa = {
            id: id,
            numero_chamado: tarefa.numero_chamado,
            tarefa: tarefa.tarefa,
            analista_task: tarefa.analista_task,
            equipe_task: user.equipe,
            data_task: tarefa.data_task,
            mesa_task: tarefa.mesa_task,
            justificativa_task: justificativa,
        }
        if(novoChamado == true) {
            createTarefa(task)
            alert("Chamado registrado!")
        } else {
            updateTarefa(task)
        }

        router.push("/Dashboard")
    }

    return (
        <>
        <MainRegisterForm>
            <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
                <RegisterFormHeader>
                    <h1>Dados da {chamado.tarefa}</h1>
                </RegisterFormHeader>
                <RegisterFormBody>
                    <li>
                        <Input 
                            label='Nº do Chamado'
                            value={chamado.numero_chamado}
                            disabled
                        />
                    </li>
                    <li>
                        <Input 
                            label='Nº da TASK' 
                            value={chamado.tarefa}
                            disabled
                        />
                    </li>
                    <li>
                        <Input 
                            label='Data' 
                            value={chamado.data_task}
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
                        <Textarea 
                        label='Justificativa do repasse:' 
                        defaultValue={justificativa}
                        placeholder='Informe porque o chamado foi repassado.'
                        onChange={(e) => setJustificativa(e.target.value)}
                        required
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                        />
                    </li>
                    <div className='btnContainer'>
                        <Link className='cancel' href='../'>Cancelar</Link>
                        <Button type='submit' className='send'>Salvar</Button>
                    </div>
                </RegisterFormBody>
            </RegisterFormController>
        </MainRegisterForm>
        </>
    )
}

export default RegisterFormTask