const axios = require('axios');

export const createRegister = async (register: IRegister) => {
    const response = await axios.post('http://localhost:5000/register', {
        number: register.number,
        task: register.task,
        sctask: register.sctask,
        date: register.date,
        user: register.user,
        team: register.team,
        supervisor: register.supervisor,
        classification: register.classification,
        motive: register.motive,
        system: register.system,
        fixProc: register.fixProc,
        observations: register.observations,
    }).catch((error: any) => console.log(error))
    
    console.log(response)
    return response
}

export const getRegisters = async() => {
    const response = await axios.get('http://localhost:5000/register')
    .then((res: any) => res.data.registers)

    return response
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
        team: register.team,
        supervisor: register.supervisor,
        classification: register.classification,
        system: register.system,
        fixProc: register.fixProc,
        observations: register.observations,
        supervisorObservations: register.supervisorObservations
    }).catch((error: any) => console.log(error))
    
    return alert("Registro alterado com sucesso.")
}