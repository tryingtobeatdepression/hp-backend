import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'

export const router: Router = Router()

// Organizations Auth
router.route('/orgs/login')
    .post(controller.login(true))
router.route('/orgs/refresh-token')
    .post(controller.refreshAccessToken(true))
router.route('/orgs/logout')
    .post(isAuthenticated, controller.logout(true))
// Users Auth
router.route('/login')
    .post(controller.login())
router.route('/refresh-token')
    .post(controller.refreshAccessToken())
router.route('/logout')
.post(isAuthenticated, controller.logout())