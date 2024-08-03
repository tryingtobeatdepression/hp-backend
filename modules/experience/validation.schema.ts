import { body } from "express-validator";

export const experienceValidationSchema = [
    body("title").isString(),
    body("description").isString(),
    body("overview").isString(),
    body("status").isString(),
    body("capacity").isNumeric(),
    body("itinerary").isArray().notEmpty(),
    body("duration").isString(),
    body("rating").isNumeric(),
    body("includes").isArray().notEmpty(),
    body("media").isArray(),
]