import { Request, Response } from "express";
import { AppError } from "../modules/common/errors";
import CrudRepository from "../mongo/repositories/crud.repo";

export const restrictTo =
    (repo: CrudRepository<any>) => {
        return (async (req: Request, res: Response, next: any) => {
            const id = req.params.id;
            const doc = await repo.findById(id)
            if (
                doc?.role! &&
                doc?.role !== req?.user?.role
            ) {
                return next(new AppError(`Only ${doc?.role!}s are allowed.`, 403))
            }
            next()
        })
    }