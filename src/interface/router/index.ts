//@ts-nocheck

import { Router } from 'express'
import { routerEspecies } from './especies/'
import { routerHome } from './homepage/'

export const router = Router()

router.use('/v1', [routerEspecies, routerHome])

router.get('/health', (req, res) => {
    res.send({ message: "health" })
})
