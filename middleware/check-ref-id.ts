import { NextFunction, Request, Response } from "express";
import CrudRepository from "../mongo/repositories/crud.repo";
import { AppError } from "../modules/common/errors";

export const checkRefId = (repo: CrudRepository<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(! await repo.findById(req.body.id))
            return next(new AppError('ObjectId not found', 404))
        next()
    }
}