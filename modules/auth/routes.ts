import { Router } from 'express'
import * as controller from './controller'

export const router: Router = Router()

router.route('/orgs/login')
    .post(controller.login(true))

router.route('/login')
    .post(controller.login())