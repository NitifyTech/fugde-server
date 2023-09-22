//@ts-nocheck
import { Response, Request } from 'express'
import { Homepage } from '../../application/use-case/HomePagesInfos'

class HomepageController {
    async getHomepage(req: Request, res: Response) {
        try {
            const result = await Homepage()
            res.status(200).send(result)
        } catch (e) {
            console.log("🚀 ~ file: Homepage.ts:10 ~ HomepageController ~ getHomepage ~ e:", e)
            res.status(500).send({
                erro: 500,
                message: 'Não será possivel atender vossa solicitação.'
            })
        }
    }
}

export const homepageController = new HomepageController()