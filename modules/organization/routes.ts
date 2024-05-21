import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { OrgTypes } from './enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { router as artifactRouter }  from '../artifact/routes'
import { restrictTo } from '../../middleware/restrict-to'

export const router: Router = Router()
router.use('/:orgid/artifacts', artifactRouter)

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