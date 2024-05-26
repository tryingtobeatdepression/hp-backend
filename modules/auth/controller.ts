import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../common/enums/errors.enum";
import { userRepo } from "../../mongo/repositories/user.repo";
import { compareToken } from "../../utils/encryption";
import { sign } from "jsonwebtoken";
import catchAsync from "../../utils/catch-async";
import { organizationRepo } from "../organization/repository";


export const login = (isOrg: boolean = false) => {
    return (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body
        const repo = isOrg ? organizationRepo : userRepo
        // Check if user exists
        const user = await repo.findByEmail(email)
        if (!user)
            return res.status(400).json({
                error: ErrorMessages.USER_DOESNT_EXIST,
            })
        // Check if passwords match
        if (! await compareToken(password, user.password))
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

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         // Find the user by ID in the database
//         const user = await User.findById(userId);

//         // Generate an access token and a refresh token
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         // Save the refresh token to the user in the database
//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         // Return the generated tokens
//         return { accessToken, refreshToken };
//     } catch (error: any) {
//         // Handle any errors that occur during the process
//         throw new Error(error?.message!);
//     }
// };