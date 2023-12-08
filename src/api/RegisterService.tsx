const axios = require('axios');

export const createRegister = async (register: IRegister) => {
    const response = await axios.post('http://localhost:5000/register', {
        numero: register.numero,
        task: register.task,
        sctask: register.sctask,
        data: register.data,
        mesaTarefa: register.mesaTarefa,
        mesaChamado: register.mesaChamado,
        status: register.status,
        analista: register.analista,
        equipe: register.equipe,
        supervisor: register.supervisor,
        classificacao: register.classificacao,
        sistema: register.sistema,
        motivo: register.motivo,
        corrigirArtigo: register.corrigirArtigo,
        justificativa: register.justificativa,
        analiseSupervisor: register.analiseSupervisor,
        analiseSniper: register.analiseSniper,
        analiseConclusao: register.analiseConclusao
    }).catch((error: any) => console.log(error))
    
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
    const response = await axios.patch(`http://localhost:5000/chamados/${register.numero}`, {
        numero: register.numero,
        task: register.task,
        sctask: register.sctask,
        data: register.data,
        mesaTarefa: register.mesaTarefa,
        mesaChamado: register.mesaChamado,
        status: register.status,
        analista: register.analista,
        equipe: register.equipe,
        motivo: register.motivo,
        supervisor: register.supervisor,
        classificacao: register.classificacao,
        sistema: register.sistema,
        corrigirArtigo: register.corrigirArtigo,
        justificativa: register.justificativa,
        analiseSupervisor: register.analiseSupervisor,
        analiseSniper: register.analiseSniper,
        analiseConclusao: register.analiseConclusao
    }).catch((error: any) => console.log(error))
    
    return alert("Registro alterado com sucesso.")
}