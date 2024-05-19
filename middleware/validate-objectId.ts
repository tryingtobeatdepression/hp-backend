import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `${id} is not a valid ObjectId.`,
        });
    }
    next();
};