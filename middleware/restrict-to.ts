import { NextFunction, Request, Response } from "express";
import { AppError } from "../modules/common/errors";

export const restrictTo = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.user?.role
        if (!role || !roles.includes(role))
            return next(new AppError(`Not found`, 404))
        next()
    }
}
