import { Router } from 'express'
import * as controller from './controller'

export const router: Router = Router()

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id')
    .patch(controller.update)
    .get(controller.getOne)
    .delete(controller.destroy)

