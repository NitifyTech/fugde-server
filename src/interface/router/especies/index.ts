//@ts-nocheck

import { Router } from 'express'
export const routerEspecies = Router()

routerEspecies.get('/specie', (req, res) => {
    res.send([])
})

