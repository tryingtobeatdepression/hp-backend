import { Router } from 'express'
import * as controller from './controller'
import { isRole } from '../../middleware/authorization'
import { isAuthenticated } from '../../middleware/auth'


export const router: Router = Router()

router.route('/')
    .get(isAuthenticated, controller.list)
    .post(isAuthenticated, isRole(0), controller.create)