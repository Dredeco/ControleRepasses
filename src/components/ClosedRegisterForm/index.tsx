"use client"

import React, { FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createRegister, getRegisters, updateRegister } from '@/api/RegisterService'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { AppContext } from '@/context/AppContext'
import { registers } from '@/api/db'
import { MainRegisterForm, RegisterFormBody, RegisterFormController, RegisterFormHeader } from './style'
import { getTasks } from '@/api/TarefaService'
import { ITarefa } from '@/types/Tarefa'

const atualizar = [
    {name: "Não"},
    {name: "Sim"}
]

const tipoAtualizacao = [
    {name: "Atualizar"},
    {name: "Desativar"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const ClosedRegisterForm = (numeroChamado: any) => {
    const [id, setId] = useState('')
    const [chamado, setChamado] = useState(Object)
    const [tarefas, setTarefas] = useState(Array<Object> || null)
    const [analise_supervisor, setAnaliseSupervisor] = useState('')
    const [analise_sniper, setAnaliseSniper] = useState('')
    const [analise_conclusao, setAnaliseConclusao] = useState('')
    const [corrigir_artigo, setCorrigirArtigo] = useState(atualizar[0].name)
    const [data, setData] = useState('')
    const [n1_resolveria, setN1Resolveria] = useState(atualizar[0].name)
    const [novoChamado, setNovoChamado] = useState(Boolean)
    const [repasse_indevido, setRepasseIndevido] = useState(atualizar[0].name)
    const [nome_artigo, setNomeArtigo] = useState('')
    const [solicitacao_artigo, setSolicitacaoArtigo] = useState(tipoAtualizacao[0].name)
    const [validacao_artigo, setValidacaoArtigo] = useState(atualizar[0].name)
    const [justificativa_artigo, setJustificativaArtigo] = useState('')

    const {user} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const listaNaoJustificados = registers
        const getIncData = async () => {
            const listaJustificados = await getRegisters()
            const listaTarefas = await getTasks()

            const tarefasFiltradas = listaTarefas.filter((objeto: any) =>objeto["numero_chamado"] == numeroChamado.numeroChamado)
            setTarefas(tarefasFiltradas)
            
            const objetosArray1 = listaJustificados.filter((objeto: any) => objeto["numero_chamado"] == numeroChamado.numeroChamado);
            if(objetosArray1 == null) {
                setNovoChamado(true)
            } else {
                setNovoChamado(false)
            }
            
            const objetosArray2 = listaNaoJustificados.filter((objeto: any) => objeto["numero_chamado"] == numeroChamado.numeroChamado);
        
            // Combina os atributos de todos os objetos, evitando duplicatas e valores nulos
            const atributosCombinados = objetosArray1.reduce((acc: any, obj: any) => {
                Object.keys(obj).forEach(key => {
                    const valor = obj[key];
                    if (valor !== null && valor !== undefined) {
                        acc[key] = valor;
                    }
                });
                return acc;
            }, {});
        
            objetosArray2.forEach((obj: any) => {
                Object.keys(obj).forEach(key => {
                    const valor = obj[key];
                    if (valor !== null && valor !== undefined) {
                        atributosCombinados[key] = valor;
                    }
                });
            });
        
            setChamado(atributosCombinados);
            setAnaliseConclusao(atributosCombinados.analise_conclusao)
            setAnaliseSupervisor(atributosCombinados.analise_supervisor)
            setAnaliseSniper(atributosCombinados.analise_sniper)
            setRepasseIndevido(atributosCombinados.repasse_indevido)
            setN1Resolveria(atributosCombinados.n1_resolveria)
            setNomeArtigo(atributosCombinados.nome_artigo)
            setSolicitacaoArtigo(atributosCombinados.solicitacao_artigo)
            setValidacaoArtigo(atributosCombinados.validacao_artigo)
            setJustificativaArtigo(atributosCombinados.justificativa_artigo)
        }
        getIncData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register: any = {
        id: id,
        numero_chamado: chamado.numero_chamado,
        tarefas: tarefas,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: user.equipe,
        data_chamado: chamado.data_chamado,
        n1_resolveria: n1_resolveria,
        analise_conclusao: analise_conclusao,
        analise_supervisor: analise_supervisor,
        analise_sniper: analise_sniper,
        repasse_indevido: repasse_indevido,
        nome_artigo: nome_artigo,
        solicitacao_artigo: solicitacao_artigo,
        validacao_artigo: validacao_artigo,
        justificativa_artigo: justificativa_artigo
        }
        if(novoChamado == true) {
            createRegister(register)
            alert("Chamado registrado!")
        } else {
            updateRegister(register)
        }

        router.push("/Dashboard")
    }

  return (
    <>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
            <RegisterFormHeader>
                <h1>Dados do chamado {chamado.numero_chamado}</h1>
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
                        label='Data' 
                        value={chamado.data_chamado}
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
                <h2>Tarefas do chamado {chamado.numero_chamado}</h2>
                {tarefas.length > 0 ? 
                    tarefas.map((tarefa: any) => (
                        <>
                        <li key={tarefa.tarefa}>
                            <Input 
                                label='Nº da TASK' 
                                value={tarefa.tarefa}
                                disabled
                            />
                        </li>
                        <li key={tarefa.justificativa_task}>
                            <Textarea 
                                label={`Justificativa da ${tarefa.tarefa}`} 
                                value={tarefa.justificativa_task}
                                disabled
                            />
                        </li>
                        </>
                    ))
                    :
                    <><h4>Não há nenhuma tarefa justificada para o chamado.</h4></>}
                    <h2>Analises do chamado {chamado.numero_chamado}</h2>
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={chamado.analise_supervisor}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    disabled={user.funcao == "SUPERVISOR TÉCNICO" ? false : true}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Análise do Sniper:' 
                    defaultValue={chamado.analise_sniper}
                    onChange={(e) => setAnaliseSniper(e.target.value)}
                    disabled={user.funcao == "SNIPER TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select
                        label='Repasse incorreto'
                        options={atualizar} 
                        value={repasse_indevido}
                        onChange={(e) => setRepasseIndevido(e.target.value)}
                        disabled={user.funcao == "SNIPER TECNICO" ? false : true}
                    />
                </li>
                {chamado.status_chamado == "Resolvido" || chamado.status_chamado == "Encerrado" ? 
                <>
                <li>
                    <Textarea 
                    label='Análise de Conclusão:' 
                    placeholder='Informe o que foi feito para resolver o problema.'
                    defaultValue={chamado.analise_conclusao}
                    onChange={(e) => setAnaliseConclusao(e.target.value)}
                    disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select
                        label='Poderia ser resolvido no N1'
                        options={atualizar} 
                        value={n1_resolveria}
                        onChange={(e) => setN1Resolveria(e.target.value)}
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select 
                        name='corrigir artigo' 
                        label='Artigo a corrigir'
                        options={atualizar} 
                        value={corrigir_artigo}
                        onChange={(e) => setCorrigirArtigo(e.target.value)}
                    />
                </li>
                {corrigir_artigo == "Não" ? 
                <></>
                : // ATUALIZAÇÃO DO ARTIGO
                <>
                <h2>Atualização do Artigo:</h2>
                <li>
                    <Input 
                        name='nome artigo' 
                        label='Nome do Artigo' 
                        onChange={(e) => setNomeArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Select 
                        name='tipo atualizacao' 
                        label='Tipo da atualização'
                        options={tipoAtualizacao} 
                        value={solicitacao_artigo}
                        onChange={(e) => setSolicitacaoArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Select 
                        name='valudacao do atigo' 
                        label='Houve validação pelo Responsável Técnico'
                        options={atualizar} 
                        value={validacao_artigo}
                        onChange={(e) => setValidacaoArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Justificativa da atualização:' 
                    placeholder=''
                    value={justificativa_artigo}
                    onChange={(e) => setJustificativaArtigo(e.target.value)}
                    />
                </li>
                </>
                }
                </>
                :
                <></>}
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

export default ClosedRegisterForm




/* 
1- Analista que repassou vai classificar e justificar o repasse do chamado
2- SPOC irá realizar a análise do chamado

*/