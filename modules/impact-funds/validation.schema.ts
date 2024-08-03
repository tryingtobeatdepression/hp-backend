import { body } from "express-validator";

export const impactFundsValidationSchema = [
    body("project").isMongoId(),
    body("totalAmount").isNumeric().notEmpty(),
]