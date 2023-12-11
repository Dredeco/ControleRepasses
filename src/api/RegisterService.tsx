const axios = require('axios');

export const createRegister = async (register: IRegister) => {
    const response = await axios.post('http://localhost:5000/chamados', {
        numero_chamado: register.numero_chamado,
        task: register.task,
        sctask: register.sctask,
        analista_task: register.analista_task,
        equipe: register.equipe,
        classificacao: register.classificacao,
        sistema: register.sistema,
        motivo: register.motivo,
        justificativa: register.justificativa,
        analise_conclusao: register.analise_conclusao,
        analise_supervisor: register.analise_supervisor,
        analise_sniper: register.analise_sniper,
        nome_artigo: register.nome_artigo,
        solicitacao_artigo: register.solicitacao_artigo,
        validacao_artigo: register.validacao_artigo,
        justificativa_artigo: register.justificativa_artigo
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

export const updateRegister = async (register: IRegister) => {
    const response = await axios.patch(`http://localhost:5000/chamados/${register.numero_chamado}`, {
        numero_chamado: register.numero_chamado,
        task: register.task,
        sctask: register.sctask,
        analista_task: register.analista_task,
        equipe: register.equipe,
        classificacao: register.classificacao,
        sistema: register.sistema,
        motivo: register.motivo,
        justificativa: register.justificativa,
        analise_supervisor: register.analise_supervisor,
        analise_sniper: register.analise_sniper,
        analise_conclusao: register.analise_conclusao,
        nome_artigo: register.nome_artigo,
        solicitacao_artigo: register.solicitacao_artigo,
        validacao_artigo: register.validacao_artigo,
        justificativa_artigo: register.justificativa_artigo
    }).catch((error: any) => console.log(error))
    
    return alert("Registro alterado com sucesso.")
}