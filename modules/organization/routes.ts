import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { OrgTypes } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { restrictTo } from '../../middleware/restrict-to'
import { checkRefId } from '../../middleware/check-ref-id'
import { organizationRepo } from './repository'

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
        restrictTo([...Object.values(OrgTypes), UserRoles.ADMIN]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        restrictTo([UserRoles.ADMIN]),
        controller.destroy
    )