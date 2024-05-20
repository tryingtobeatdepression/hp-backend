import { NextFunction, Request, Response } from "express"
import { ErrorMessages } from "../enums/errors.enum"
import { AppError } from "../modules/common/errors"

export interface AuthDto {
    username: string;
    password: string;
}

export const checkLoginInput = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: AuthDto = req.body
    if (!(username && password))
        return next(new AppError(ErrorMessages.BAD_AUTH_DATA, 400))
    next()
}