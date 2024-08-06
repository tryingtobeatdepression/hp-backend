import { body } from "express-validator";

export const userExpBookingValidationSchema = [
    body("user").isMongoId(),
    body("experience").isMongoId(),
]