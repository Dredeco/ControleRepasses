const axios = require('axios').default;

export const createRegister = async (register: IRegister) => {
    try{
        const response = await axios.post('http://localhost:5000/api/incident', {
            number: register.number,
            task: register.task,
            sctask: register.sctask,
            date: register.date,
            user: register.user,
            supervisor: register.supervisor,
            classification: register.classification,
            system: register.system,
            fixProc: register.fixProc,
            observations: register.observations
        })

        confirm.log(response)
    } catch(error) {
        alert(error)
    }
    
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