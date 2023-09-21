import { ExibeInformacao } from './log/ExibeInformacao'

const funcoesWebSocket: Record<string, (data: any) => void> = {
    'log': ExibeInformacao
}

export const funcoes = Object.entries(funcoesWebSocket)

