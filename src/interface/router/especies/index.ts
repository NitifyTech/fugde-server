//@ts-nocheck
import { especieController } from '../../controller/Especies'
import { Router } from 'express'
export const routerEspecies = Router()

routerEspecies.get('/especies/:id/:especie', especieController.getEspecie)

