import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { isRole } from '../../middleware/authorization'
import { OrgTypes } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { router as artifactRouter }  from '../artifact/routes'

export const router: Router = Router()
router.use('/:id/artifacts', artifactRouter)

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
        isRole([...Object.values(OrgTypes), UserRoles.ADMIN]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        isRole([UserRoles.ADMIN]),
        controller.destroy
    )