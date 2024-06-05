import { body } from 'express-validator'

export const artifactValidationSchema = [
    body('organization').exists({
        values: 'undefined',
    }).withMessage("Organization id must be passed."),

    body('name').not().isNumeric().withMessage("Name can't be a number"),

    body('description').isString(),
    body('media').isArray(),
    body('discoveryLocation').isString(),
    body('age').isString(),
    body('deminsions').isArray(),
    body('indexCode').isString(),
    body('currentLocation').isString(),
]