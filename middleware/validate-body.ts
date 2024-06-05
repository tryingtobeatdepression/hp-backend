import { Request, Response } from "express"
import { validationResult } from "express-validator"


export const validateBody = async (req: Request, res: Response, next: any) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        };
        res.status(422).json({ errors: result.array() });
    }

