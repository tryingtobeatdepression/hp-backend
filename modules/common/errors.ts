import { Error } from "mongoose";
import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
    statusCode?: number;
    status: 'fail' | 'error';
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 600 ? 'fail' : 'error';
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

const handleDuplicateFieldsDB = (err: any): AppError => {
    const message = `Duplicate field value:${err.keyValue.name} please use another value `;
    return new AppError(message, 400);
}

const handleValidationErrorDB = (err: any): AppError => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data ${errors.join(", ")} `;
    return new AppError(message, 400);
}

const handleJWTExpiredError = (): AppError => {
    return new AppError("Your token has expired,Please log in again", 401);
}

const handleJWTError = (): AppError => {
    return new AppError("Invalid token. Please login again!", 401);
}

const handleCastErrorDB = (err: any): AppError => {
    const path = err.path.toString().replace("_", () => " ");
    const message = `Invalid ${path}:${err.value}.`;
    return new AppError(message, 400);
}

const sendError = (err: any, res: any): void => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong",
    });
}

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };
    if (err.name === "CastError") {
        error = handleCastErrorDB(error);
        return sendError(error, res);
    }
    if (err.code == 11000) {
        error = handleDuplicateFieldsDB(error);
        return sendError(error, res);
    }

    if (err.name === "ValidationError") {
        error = handleValidationErrorDB(error);
        return sendError(error, res);
    }
    if (err.name === "JsonWebTokenError") {
        error = handleJWTError();
        return sendError(error, res);
    }
    if (err.name === "TokenExpiredError") {
        error = handleJWTExpiredError();
        return sendError(error, res);
    }
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}