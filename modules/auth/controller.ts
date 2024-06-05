import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../common/enums/errors.enum";
import { userRepo } from "../../mongo/repositories/user.repo";
import catchAsync from "../../utils/catch-async";
import { organizationRepo } from "../organization/repository";
import { verify } from "jsonwebtoken";
import { AppError } from "../common/errors";
import { generateAccessToken, generateRefreshToken } from "../../mongo/util/methods";


export const login = (isOrg: boolean = false) => {
    return (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body
        const repo = isOrg ? organizationRepo : userRepo
        const user = await repo.findByEmail(email)

        if (!user)
            return res.status(400).json({
                error: ErrorMessages.USER_DOESNT_EXIST,
            })

        if (! await user.isPasswordCorrect(password))
            return res.status(400).json({
                error: ErrorMessages.PASSWORDS_DONT_MATCH,
            })

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({
            accessToken,
            refreshToken,
            user
        })
    }))
}

export const logout = (isOrg: boolean = false) => {
    return (catchAsync(async (req: Request, res: Response, next: any) => {
        const id = req.user?.id!
        const repo = isOrg ? organizationRepo : userRepo
        await repo.updateById(id, {
            refreshToken: null,
        })
        return res.status(200).json({
            message: 'Logged out.'
        })
    }))
}

export const refreshAccessToken = (isOrg: boolean = false) => {
    return (catchAsync(async (req: Request, res: Response, next: any) => {
        const incomingRefreshToken = req.body.refreshToken
        if (!incomingRefreshToken)
            return res.status(401).json({
                error: ErrorMessages.NO_REFRESH_TOKEN,
            })

        const repo = isOrg ? organizationRepo : userRepo

        verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
            if (err) return next(new AppError(ErrorMessages.INVALID_TOKEN, 401))

            const user = await repo.findById(decoded?.id!)

            if (!user)
                return next(new AppError(ErrorMessages.USER_DOESNT_EXIST, 404))

            if (user?.refreshToken !== incomingRefreshToken) {
                return res.status(401).json({
                    error: ErrorMessages.REFRESH_TOKEN_INCORRECT,
                });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return res.status(200).json({
                accessToken, refreshToken,
            })
        })
    }))
}