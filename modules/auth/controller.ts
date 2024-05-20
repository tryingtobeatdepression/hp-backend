import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../../enums/errors.enum";
import { userRepo } from "../../mongo/repositories/user.repo";
import { compareTokens } from "../../utils/encryption";
import { sign } from "jsonwebtoken";
import catchAsync from "../../utils/catch-async";
import { AuthDto } from "../../middleware/check-login-input";


export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: AuthDto = req.body
    // Check if user exists
    const user = await userRepo.findOne({ username })
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
            username,
            role: user.role,
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: '2m'
        }
    )

    res.status(200).json({
        token,
    })
})