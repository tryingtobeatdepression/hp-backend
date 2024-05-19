import { Router } from 'express'
import * as controller from './controller'

export const router: Router = Router()

router.get('/', controller.list)
router.post('/create', controller.create)
