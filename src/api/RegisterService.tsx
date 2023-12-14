import { IRegister } from "@/types/Registers";

const axios = require('axios');

export const createRegister = async (chamado: IRegister) => {
    const response = await axios.post('http://localhost:5000/chamados', {
        numero_chamado: chamado.numero_chamado,
        tarefas: chamado.tarefas,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        classificacao: chamado.classificacao,
        sistema: chamado.sistema,
        motivo: chamado.motivo,
        justificativa_chamado: chamado.justificativa_chamado,
        analise_supervisor: chamado.analise_supervisor,
        analise_sniper: chamado.analise_sniper,
        analise_conclusao: chamado.analise_conclusao,
        nome_artigo: chamado.nome_artigo,
        solicitacao_artigo: chamado.solicitacao_artigo,
        validacao_artigo: chamado.validacao_artigo,
        justificativa_artigo: chamado.justificativa_artigo
    })
    
    console.log(response)
    return response
}

export const getRegisters = async() => {
    const response = await axios.get('http://localhost:5000/chamados')
    .then((res: any) => res.data.registers)

    return response
}

export const getRegistersNumber = async() => {
    const response = await axios.get('http://localhost:5000/chamados/numero')
    .then((res: any) => res.data.registers)

    return response
}

export const getTaskNumbers = async() => {
    const response = await axios.get('http://localhost:5000/chamados/task')
    .then((res: any) => res.data.registers)

    return response
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`http://localhost:5000/chamados/analista/${name}`)
    .then((res: Response) => res)

    const {incidentUser} = response.data

    return incidentUser
}

export const getRegisterByNumber = async(numero: string) => {
    const response = await axios.get(`http://localhost:5000/chamados/${numero}`)
    .then((res: Response) => res.json())

    return response
}

export const updateRegister = async (chamado: IRegister) => {
    const response = await axios.patch(`http://localhost:5000/chamados/${chamado.numero_chamado}`, {
        id: chamado.id,
        numero_chamado: chamado.numero_chamado,
        tarefas: chamado.tarefas,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        classificacao: chamado.classificacao,
        sistema: chamado.sistema,
        motivo: chamado.motivo,
        justificativa_chamado: chamado.justificativa_chamado,
        analise_supervisor: chamado.analise_supervisor,
        analise_sniper: chamado.analise_sniper,
        analise_conclusao: chamado.analise_conclusao,
        nome_artigo: chamado.nome_artigo,
        solicitacao_artigo: chamado.solicitacao_artigo,
        validacao_artigo: chamado.validacao_artigo,
        justificativa_artigo: chamado.justificativa_artigo
    }).catch((error: any) => console.log(error))
    
    return alert("Registro alterado com sucesso.")
}