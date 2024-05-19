import { Router } from 'express'
import * as controller from './controller'
import {validateObjectId} from "../../middleware/validate-objectId";

export const router: Router = Router()

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.use(validateObjectId)

router.route('/:id')
    .patch(controller.update)
    .get(controller.getOne)
    .delete(controller.destroy)

