import { body } from "express-validator";

export const orgExpValidationSchema = [
    body("host").isMongoId(),
    body("experience").isMongoId(),
    body("pricePerIndividual").isNumeric(),
    body("registrationStartDate").isDate(),
    body("registrationEndDate").isDate(),
    body("status").isString(),
    body("offers").isArray(),
]