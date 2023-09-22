//@ts-nocheck
import { Response, Request } from 'express'
import { Especies } from '../../application/use-case/EspeciesInfos'

class EspecieController {
    async getEspecie(req: Request, res: Response) {
        try {
            const { id, especie } = await req.params
            const result = await Especies({ id, especie })
            res.status(200).send(result)
        } catch (e) {
            console.log("🚀 ~ file: Especie.ts:10 ~ EspecieController ~ getEspecie ~ e:", e)
            res.status(500).send({
                erro: 500,
                message: 'Não será possivel atender vossa solicitação.'
            })
        }
    }
}

export const especieController = new EspecieController()