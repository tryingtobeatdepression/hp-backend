import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { restrictTo } from '../../middleware/restrict-to'

export const router: Router = Router()

router.route('/')
    .get(
        isAuthenticated,
        restrictTo([UserRoles.ADMIN]),
        controller.list
    )
    .post(controller.create)

router.route('/:id')
    .get(
        validateObjectId,
        controller.findOne
    )
    .patch(
        validateObjectId,
        isAuthenticated,
        restrictTo(Object.values(UserRoles)),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        restrictTo(Object.values(UserRoles)),
        controller.destroy
    )