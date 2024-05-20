import { NextFunction, Request, Response } from "express";
import { AppError } from "../modules/common/errors";

export const isRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.user?.role
        console.log(`role: ${role}`)
        console.log(`role.includes: ${roles.includes(role!)}`)
        if (!role || !roles.includes(role))
            return next(new AppError(`Forbidden`, 403))
        next()
    }
}

