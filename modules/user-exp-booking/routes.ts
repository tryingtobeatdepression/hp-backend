import { Router } from 'express'
import * as controller from './controller'

export const router: Router = Router()

router.route('/')
    .get(controller.list)
    .post(controller.create)

router.route('/:id')
    .get(controller.findOne)
    .patch(controller.update)
    .delete(controller.destroy)