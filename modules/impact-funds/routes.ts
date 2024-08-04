import { Router } from 'express'
import * as controller from './controller'
import {validateObjectId} from "../../middleware/validate-objectId";

export const router: Router = Router()

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id')
    .patch(validateObjectId,controller.update)
    .get(validateObjectId,controller.getOne)
    .delete(validateObjectId,controller.destroy)

router.route('/:id/donate') 
    .post(controller.makeDonation)

