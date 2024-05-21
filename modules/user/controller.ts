import { Request, Response } from "express"
import { userRepo } from "../../mongo/repositories/user.repo"
import catchAsync from "../../utils/catch-async"
import { factory } from '../common/handler-factory'
import { AppError } from "../common/errors"
import { ErrorMessages } from "../../enums/errors.enum"

export const list = factory.getAll(userRepo)

export const create = factory.create(userRepo)

export const update = catchAsync(async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    const doc = await userRepo.findById(id)
    if (doc?.role! === 'admin' && req?.user?.role === 'visitor')
        return next(new AppError(ErrorMessages.UNAUTHORIZED, 403))

    const document = await userRepo.updateById(id, req.body);
    if (!document) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
        status: 'success',
        document
    });
})

export const destroy = catchAsync(async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    const doc = await userRepo.findById(id)
    if (doc?.role! === 'admin' && req?.user?.role === 'visitor')
        return next(new AppError(ErrorMessages.UNAUTHORIZED, 403))
    const document = await userRepo.deleteById(id);
    if (!document) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json();
})

export const findOne = factory.getOne(userRepo)