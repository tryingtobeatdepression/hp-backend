import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../mongo/models/user.schema";
import { AppError } from "../modules/common/errors";

export const isRole = (role: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req?.user?.role !== role)
            return next(new AppError(`${UserRoles[role]}`, 403))
        next()
    }
}

