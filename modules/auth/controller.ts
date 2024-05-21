import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../../enums/errors.enum";
import { userRepo } from "../../mongo/repositories/user.repo";
import { compareTokens } from "../../utils/encryption";
import { sign } from "jsonwebtoken";
import catchAsync from "../../utils/catch-async";
import { AuthDto } from "../../middleware/check-login-input";
import { organizationRepo } from "../organization/repository";


export const login = (isOrg: boolean = false) => {
    return (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password }: AuthDto = req.body
        const repo = isOrg ? organizationRepo : userRepo
        // Check if user exists
        const user = await repo.findByEmail(email)
        if (!user)
            return res.status(400).json({
                error: ErrorMessages.USER_DOESNT_EXIST,
            })
        // Check if passwords match
        if (! await compareTokens(password, user.password))
            return res.status(400).json({
                error: ErrorMessages.PASSWORDS_DONT_MATCH,
            })
        // Create JWT token
        const token = sign(
            {
                id: user._id,
                email,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY!,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME!,
            }
        )

        res.status(200).json({
            token, user
        })
    }))
}