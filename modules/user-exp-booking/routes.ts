import { Router } from 'express'
import * as controller from './controller'
import { checkRefId } from '../../middleware/check-ref-id'
import { userRepo } from '../../mongo/repositories/user.repo'
import { organizationExperienceRepository } from '../organization-experience/repository'

export const router: Router = Router()

router.route('/')
    .get(controller.list)
    .post(
        checkRefId(userRepo, "user"),
        checkRefId(organizationExperienceRepository, "orgExperience"),
        controller.create
    )

router.route('/:id')
    .get(controller.findOne)
    .patch(controller.update)
    .delete(controller.destroy)