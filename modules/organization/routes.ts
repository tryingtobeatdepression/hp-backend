import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { isRole } from '../../middleware/authorization'
import { OrganizationTypes } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'

export const router: Router = Router()

router.route('/')    // TESTED ✅
    .get(controller.list)
    .post(controller.create) 

router.route('/:id') // TESTED ✅
    .get(
        validateObjectId,
        controller.findOne
    )
    .patch( 
        validateObjectId,
        isAuthenticated,
        isRole([...Object.values(OrganizationTypes), UserRoles.ADMIN]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        isRole([UserRoles.ADMIN]),
        controller.destroy
    )