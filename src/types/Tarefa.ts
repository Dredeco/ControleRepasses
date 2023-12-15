export interface ITarefa {
    id?: string,
    numero_chamado: string,
    tarefa: string,
    analista_task: string,
    equipe_task?: string,
    classificacao_task?: string,
    sistema_task?: string,
    motivo_task?: string,
    data_task: string,
    mesa_task: string,
    justificativa_task?: string,
    criadoEm?: Date,
}