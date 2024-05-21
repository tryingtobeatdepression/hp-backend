import { NextFunction, Request, Response } from "express";
import { AppError } from "../modules/common/errors";

export const isRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.user?.role
        if (!role || !roles.includes(role))
            return next(new AppError(`Forbidden`, 403))
        next()
    }
}