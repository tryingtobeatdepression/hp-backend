import { body } from "express-validator";

export const userValidationSchema = [
    body("username").isString(),
    body("name").isString(),
    body("email").isEmail(),
    body("password").isString(),
]