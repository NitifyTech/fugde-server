//@ts-nocheck

import { Router } from 'express'
import { homepageController } from '../../controller/Homepage'
export const routerHome = Router()

routerHome.get('/homepage', homepageController.getHomepage)

