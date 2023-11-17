import { error } from "console";

const axios = require('axios');

export const createRegister = async (register: IRegister) => {
    const response = await axios.post('https://cr-api.onrender.com/api/incident', {
        number: register.number,
        task: register.task,
        sctask: register.sctask,
        date: register.date,
        user: register.user,
        supervisor: register.supervisor,
        classification: register.classification,
        system: register.system,
        fixProc: register.fixProc,
        observations: register.observations,
    }).catch((error: any) => console.log(error))
    
    return alert("Registro criado com sucesso.")
}

export const getRegisters = async() => {
    const response = await axios.get('https://cr-api.onrender.com/api/incident')
    .then((res: Response) => res)

    return response.data.response
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`https://cr-api.onrender.com/api/incident/user/${name}`)
    .then((res: Response) => res)

    const {incidentUser} = response.data

    return incidentUser
}

export const getRegisterByNumber = async(number: string) => {
    const response = await axios.get(`https://cr-api.onrender.com/api/incident/${number}`)
    .then((res: Response) => res)

    return response.data.incidentNumber
}

export const updateRegister = async (register: IRegister) => {
    const response = await axios.post(`https://cr-api.onrender.com/api/incident/${register.number}`, {
        number: register.number,
        task: register.task,
        sctask: register.sctask,
        date: register.date,
        user: register.user,
        supervisor: register.supervisor,
        classification: register.classification,
        system: register.system,
        fixProc: register.fixProc,
        observations: register.observations,
        supervisorObservations: register.supervisorObservations
    }).catch((error: any) => console.log(error))
    
    return alert("Registro alterado com sucesso.")
}