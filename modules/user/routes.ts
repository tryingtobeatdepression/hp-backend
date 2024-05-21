import { Router } from 'express'
import * as controller from './controller'
import { isRole } from '../../middleware/authorization'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from './enum'
import { validateObjectId } from '../../middleware/validate-objectId'


export const router: Router = Router()

router.route('/')
    .get(isAuthenticated, isRole([UserRoles.ADMIN]), controller.list)
    .post(controller.create)

router.route('/:id')
    .get(validateObjectId, isAuthenticated, controller.findOne)
    .patch(
        validateObjectId,
        isAuthenticated,
        isRole([UserRoles.ADMIN, UserRoles.VISITOR]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        isRole([UserRoles.ADMIN, UserRoles.VISITOR]),
        controller.destroy
    )