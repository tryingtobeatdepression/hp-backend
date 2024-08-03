import { body } from "express-validator";

export const projectValidationSchema = [
    body("name").isString(),
    body("description").isString(),
    body("location").isString(),
    body("startingPoint").isString()
]