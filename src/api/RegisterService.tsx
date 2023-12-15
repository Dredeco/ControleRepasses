import { IRegister } from "@/types/Registers";

const axios = require('axios');

export const createRegister = async (chamado: IRegister) => {
    const response = await axios.post('http://localhost:5000/api/chamados', {
        numero_chamado: chamado.numero_chamado,
        tarefas: chamado.tarefas,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        data_chamado: chamado.data_chamado,
        n1_resolveria: chamado.n1_resolveria,
        analise_supervisor: chamado.analise_supervisor,
        analise_sniper: chamado.analise_sniper,
        repasse_indevido: chamado.repasse_indevido,
        analise_conclusao: chamado.analise_conclusao,
        nome_artigo: chamado.nome_artigo,
        solicitacao_artigo: chamado.solicitacao_artigo,
        validacao_artigo: chamado.validacao_artigo,
        justificativa_artigo: chamado.justificativa_artigo
    })
    
    console.log(response)
    return alert(`Chamado ${chamado.numero_chamado} atualizado com sucesso.`)
}

export const getRegisters = async() => {
    const response = await axios.get('http://localhost:5000/api/chamados')
    .then((res: any) => res.data.registers)

    return response
}

export const getRegistersNumber = async() => {
    const response = await axios.get('http://localhost:5000/api/chamados/numero')
    .then((res: any) => res.data.registers)

    return response
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/analista/${name}`)
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
    const response = await axios.patch(`http://localhost:5000/api/chamados/${chamado.numero_chamado}`, {
        id: chamado.id,
        numero_chamado: chamado.numero_chamado,
        tarefas: chamado.tarefas,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        data_chamado: chamado.data_chamado,
        n1_resolveria: chamado.n1_resolveria,
        analise_supervisor: chamado.analise_supervisor,
        analise_sniper: chamado.analise_sniper,
        repasse_indevido: chamado.repasse_indevido,
        analise_conclusao: chamado.analise_conclusao,
        nome_artigo: chamado.nome_artigo,
        solicitacao_artigo: chamado.solicitacao_artigo,
        validacao_artigo: chamado.validacao_artigo,
        justificativa_artigo: chamado.justificativa_artigo
    }).catch((error: any) => console.log(error))
    
    console.log(response)

    return alert(`Chamado ${chamado.numero_chamado} atualizado com sucesso.`)
}