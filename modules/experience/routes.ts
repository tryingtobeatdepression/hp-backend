import { Router } from 'express'
import * as controller from './controller'
import {validateObjectId} from "../../middleware/validate-objectId";
import { uploadImages } from '../../middleware/upload-images';

export const router: Router = Router()

router.route('/')
    .get(controller.getAll)
    .post(uploadImages.array('media'),controller.create)

router.route('/:id')
    .patch(validateObjectId,controller.update)
    .get(validateObjectId,controller.getOne)
    .delete(validateObjectId,controller.destroy)

