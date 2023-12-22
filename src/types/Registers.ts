import { ITarefa } from "./Tarefa";

export interface IRegister {
    id: string,
    numero_chamado: string,
    tarefas?: ITarefa[],
    analista_chamado: string,
    equipe_chamado?: string,
    grupo_spoc: string,
    spoc_designado: string,
    data_chamado: Date,
    motivo?: string,
    classificacao?: string,
    sistema?: string,
    justificativa_chamado?: string,
    n1_resolveria?: string,
    analise_supervisor?: string,
    analise_sniper?: string,
    repasse_indevido?: string,
    analise_conclusao?: string,
    nome_artigo?: string,
    solicitacao_artigo?: string,
    validacao_artigo?: string,
    justificativa_artigo?: string
}