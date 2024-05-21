import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'
import { AppError } from "../modules/common/errors";

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError(`${id} is not a valid ObjectId.`, 400))
    }
    next();
};