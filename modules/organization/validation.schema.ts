import { body } from "express-validator";

export const orgValidationSchema = [
    body("name").isString(),
    body("email").isEmail().notEmpty(),
    body("password").isString(),
    body("overview").isString(),
]