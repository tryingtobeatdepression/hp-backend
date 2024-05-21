import { NextFunction, Request, Response } from "express"
import { ErrorMessages } from "../modules/common/enums/errors.enum"
import { AppError } from "../modules/common/errors"

export interface AuthDto {
    email: string
    password: string
}

export const checkLoginInput = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: AuthDto = req.body
    if (!(email && password))
        return next(new AppError(ErrorMessages.BAD_AUTH_DATA, 400))
    next()
}