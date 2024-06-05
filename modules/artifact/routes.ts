import { Router } from 'express'
import * as controller from './controller'
import { isAuthenticated } from '../../middleware/auth'
import { UserRoles } from '../user/enums'
import { OrgTypes } from '../organization/enums'
import { validateObjectId } from '../../middleware/validate-objectId'
import { restrictTo } from '../../middleware/restrict-to'
import { validateBody } from '../../middleware/validate-body'
import { artifactValidationSchema } from './validation.schema'

export const router: Router = Router({
    mergeParams: true,
})

router.route('/')
    .get(controller.list)
    .post(
        isAuthenticated,
        restrictTo([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        artifactValidationSchema,
        validateBody,
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
        artifactValidationSchema,
        validateBody,
        restrictTo([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        controller.update
    )
    .delete(
        validateObjectId,
        isAuthenticated,
        restrictTo([OrgTypes.MUSUEM, UserRoles.ADMIN]),
        controller.destroy
    )