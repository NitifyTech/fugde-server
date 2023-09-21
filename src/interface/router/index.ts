import { Router } from 'express'
import { routerEspecies } from './especies/'
export const router = Router()

router.use('/v1', [routerEspecies])

router.get('/health', (req, res) => {
    res.send({ message: "health" })
})
