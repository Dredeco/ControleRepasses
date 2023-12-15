import { IRegister } from "@/types/Registers";
import { ITarefa } from "@/types/Tarefa";

const axios = require('axios');

export const createTarefa = async (tarefa: ITarefa) => {
    const response = await axios.post('http://localhost:5000/api/tarefas', {
        numero_chamado: tarefa.numero_chamado,
        tarefa: tarefa.tarefa,
        analista_task: tarefa.analista_task,
        equipe_task: tarefa.equipe_task,
        classificacao_task: tarefa.classificacao_task,
        sistema_task: tarefa.sistema_task,
        motivo_task: tarefa.motivo_task,
        data_task: tarefa.data_task,
        mesa_task: tarefa.mesa_task,
        justificativa_task: tarefa.justificativa_task,
    })
    
    console.log(response)
    return alert(`Tarefa ${tarefa.tarefa} atualizada com sucesso.`)
}

export const getTasks = async() => {
    const response = await axios.get('http://localhost:5000/api/tarefas')
    .then((res: any) => res.data.tasks)

    return response
}

export const getTasksNumbers = async() => {
    const response = await axios.get('http://localhost:5000/api/tarefas/numero')
    .then((res: any) => res.data.tasks)

    return response
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/analista/${name}`)
    .then((res: Response) => res)

    const {incidentUser} = response.data

    return incidentUser
}

export const getRegisterByNumber = async(numero: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/${numero}`)
    .then((res: Response) => res.json())

    return response
}

export const updateTarefa = async (tarefa: ITarefa) => {
    const response = await axios.patch(`http://localhost:5000/api/tarefas/${tarefa.tarefa}`, {
        id: tarefa.id,
        numero_chamado: tarefa.numero_chamado,
        tarefa: tarefa.tarefa,
        analista_task: tarefa.analista_task,
        equipe_task: tarefa.equipe_task,
        classificacao_task: tarefa.classificacao_task,
        sistema_task: tarefa.sistema_task,
        motivo_task: tarefa.motivo_task,
        data_task: tarefa.data_task,
        mesa_task: tarefa.mesa_task,
        justificativa_task: tarefa.justificativa_task,
    }).catch((error: any) => console.log(error))
    
    return alert(`Tarefa ${tarefa.tarefa} atualizada com sucesso.`)
}