import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../mongo/models/user.schema";
import { AppError } from "../modules/common/errors";

export const isRole = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.user?.role
        if (!role || !roles.includes(role))
            return next(new AppError(`${UserRoles[role!]}`, 403))
        next()
    }
}

