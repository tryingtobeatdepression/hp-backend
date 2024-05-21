import { Router } from 'express'
import * as controller from './controller'
import { isRole } from '../../middleware/authorization'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { adminOnly } from '../../middleware/admin-only'
import { restrictTo } from '../../middleware/restrict-to'
import { userRepo } from '../../mongo/repositories/user.repo'

export const router: Router = Router()

router.route('/')
    .get(
        isAuthenticated,
        isRole([UserRoles.ADMIN]),
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
        restrictTo(userRepo),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        restrictTo(userRepo),
        controller.destroy
    )