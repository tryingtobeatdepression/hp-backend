import { Router } from 'express'
import * as controller from './controller'
import { checkLoginInput } from '../../middleware/check-login-input'

export const router: Router = Router()

router.route('/login')
    .post(checkLoginInput, controller.login)
