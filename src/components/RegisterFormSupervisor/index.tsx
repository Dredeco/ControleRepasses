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
import { act } from 'react-dom/test-utils'

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

const RegisterFormSupervisor = (numeroTask: any) => {
    const [chamado, setChamado] = useState(Object)
    const [classificacao, setClassificacao] = useState(classificacoes[0].name)
    const [sistema, setSistema] = useState(aplicacao[0].name)
    const [motivo, setMotivo] = useState(motivos[0].name)
    const [justificativa, setJustificativa] = useState('')
    const [analise_supervisor, setAnaliseSupervisor] = useState('')
    const [analise_sniper, setAnaliseSniper] = useState('')
    const [analise_conclusao, setAnaliseConclusao] = useState('')
    const [corrigir_artigo, setCorrigirArtigo] = useState(atualizar[0].name)
    const [data, setData] = useState('')
    const [novoChamado, setNovoChamado] = useState(false)
    const [nome_artigo, setNomeArtigo] = useState('')
    const [solicitacao_artigo, setSolicitacaoArtigo] = useState(tipoAtualizacao[0].name)
    const [validacao_artigo, setValidacaoArtigo] = useState(atualizar[0].name)
    const [justificativa_artigo, setJustificativaArtigo] = useState('')

    const {user, setUser} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const listaNaoJustificados = registers
        const getIncData = async () => {
            const listaJustificados = await getRegisters()

            const filteredArray: any = [];

            // Filtrar objetos do primeiro array com o valor do atributo informado
            const filteredObjectsArray1 = listaJustificados.filter((obj: any) => obj["task"] === numeroTask.numeroTask);
            
            // Filtrar objetos do segundo array com o valor do atributo informado
            const filteredObjectsArray2 = listaNaoJustificados.filter((obj: any) => obj["task"] === numeroTask.numeroTask);

            // Mesclar os arrays filtrados e remover atributos duplicados
            const mergedArray = [...filteredObjectsArray1, ...filteredObjectsArray2];
            mergedArray.forEach(obj => {
                const uniqueObj: any = {};
                const uniqueValues = new Set();

                Object.keys(obj).forEach(key => {
                if (!uniqueValues.has(obj[key])) {
                    uniqueObj[key] = obj[key];
                    uniqueValues.add(obj[key]);
                }
                });

                filteredArray.push(uniqueObj);
            });

            console.log(filteredArray)
            setChamado(filteredArray)
        }
        getIncData()
    }, [])


    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register: IRegister = {
        numero_chamado: chamado.numero_chamado,
        task: chamado.task,
        sctask: chamado.sctask,
        analista_task: chamado.analista_task,
        equipe: user.equipe,
        classificacao: classificacao,
        sistema: sistema,
        motivo: motivo,
        justificativa: justificativa,
        analise_conclusao: analise_conclusao,
        analise_supervisor: analise_supervisor,
        analise_sniper: analise_sniper,
        nome_artigo: nome_artigo,
        solicitacao_artigo: solicitacao_artigo,
        validacao_artigo: validacao_artigo,
        justificativa_artigo: justificativa_artigo
        }

        if(novoChamado) {
            createRegister(register)
            alert("Chamado registrado!")
        } else {
            updateRegister(register)
            alert("Chamado atualizado!")
        }

        router.push("/Dashboard")
    }

  return (
    <>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
            <RegisterFormHeader>
                <h1>Dados do chamado: {chamado.numero_chamado}</h1>
            </RegisterFormHeader>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        value={chamado.numero_chamado}
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
                        value={data}
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
                    defaultValue={chamado.justificativa}
                    placeholder='Informe porque o chamado foi repassado.'
                    onChange={(e) => setJustificativa(e.target.value)}
                    required
                    disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                {user.funcao == "SUPERVISOR TÉCNICO" ? 
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={chamado.analise_supervisor}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    />
                </li>
                :
                <></>}
                {user.funcao == "SNIPER TÉCNICO" ? 
                <li>
                    <Textarea 
                    label='Análise do Sniper:' 
                    defaultValue={chamado.analise_sniper}
                    onChange={(e) => setAnaliseSniper(e.target.value)}
                    />
                </li>
                : // ANÁLISE DE CONCLUSÃO
                <></>}
                {chamado.status_chamado == "Resolvido" || chamado.status_chamado == "Encerrado" ? 
                <>
                <li>
                    <Textarea 
                    label='Análise de Conclusão:' 
                    placeholder='Informe o que foi feito para resolver o problema e se poderia ser resolvido no N1.'
                    defaultValue={analise_conclusao}
                    onChange={(e) => setAnaliseConclusao(e.target.value)}
                    />
                </li>
                <li>
                    <Select 
                        name='corrigir artigo' 
                        label='Artigo a corrigir?'
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