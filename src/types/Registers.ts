import { ITarefa } from "./Tarefa";

export interface IRegister {
    id?: string,
    numero_chamado: string,
    tarefas: ITarefa[],
    data_chamado?: string,
    mesa_chamado?: string,
    status_chamado?: string,
    analista_chamado?: string,
    equipe_chamado: string,
    classificacao: string,
    sistema: string,
    motivo: string,
    justificativa_chamado: string,
    analise_supervisor?: string,
    analise_sniper?: string,
    analise_conclusao?: string,
    nome_artigo?: string,
    solicitacao_artigo?: string,
    validacao_artigo?: string,
    justificativa_artigo?: string
}