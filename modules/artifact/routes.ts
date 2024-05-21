import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { isRole } from '../../middleware/authorization'
import { OrgTypes } from '../organization/enums'
import { validateObjectId } from '../../middleware/validate-objectId'

export const router: Router = Router()

router.route('/')
    .get(controller.list)
    .post(
        isAuthenticated,
        isRole([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        controller.create
    )

router.route('/:id')
    .get(
        validateObjectId,
        controller.findOne
    )
    .patch(
        validateObjectId, 
        isAuthenticated,
        isRole([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        isRole([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        controller.destroy
    )