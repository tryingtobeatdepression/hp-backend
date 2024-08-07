import { verify } from "jsonwebtoken"
import { ErrorMessages } from "../modules/common/enums/errors.enum"
import { AppError } from "../modules/common/errors"
import { NextFunction, Request, Response } from "express"
import { organizationRepo } from "../modules/organization/repository"
import { userRepo } from "../mongo/repositories/user.repo"

export const isAuthenticated =
    async (req: Request, res: Response, next: NextFunction,) => {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        // Error: no token to handle
        if (!token)
            return next(new AppError(ErrorMessages.UNAUTHORIZED, 401))

        verify(token, process.env.JWT_SECRET_KEY!, async (err: any, decoded: any) => {
            if (err) return next(new AppError(ErrorMessages.INVALID_TOKEN, 401))

            const user = await userRepo.findById(decoded?.id!)
            const org = await organizationRepo.findById(decoded?.id!)

            if (!user && !org)
                return next(new AppError(ErrorMessages.USER_DOESNT_EXIST, 404))

            const userId = String(user?._id);
            const orgId = String(org?._id)

            req.user = {
                id: user ? userId : orgId,
                role: user ? user.role : org?.role!
            }
            next()
        })
    }