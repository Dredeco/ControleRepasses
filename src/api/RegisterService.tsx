const axios = require('axios').default;

export const createRegister = async (register: IRegister) => {
    const response = await axios.post('https://cr-api.onrender.com/api/incident', {
        number: register.number,
        date: register.date,
        user: register.user,
        supervisor: register.supervisor,
        classification: register.classification,
        system: register.system,
        motive: register.motive,
        fixProc: register.fixProc,
        observations: register.observations
    }).
    then((res: Response) => {console.log(res)})

    return alert("Registro criado com sucesso.")
}

export const getRegisters = async() => {
    const response = await axios.get('https://cr-api.onrender.com/api/incident')
    .then((res: Response) => res)

    return response.data
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`https://cr-api.onrender.com/api/incident/${name}`)
    .then((res: Response) => res)

    const {incidentUser} = response.data
    console.log(incidentUser)

    return incidentUser
}