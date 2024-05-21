import { Request, Response } from "express";
import { AppError } from "../modules/common/errors";
import CrudRepository from "../mongo/repositories/crud.repo";

export const restrictTo =
    (repo: CrudRepository<any>, allowed: string, forbidden: string[]) => {
        return (async (req: Request, res: Response, next: any) => {
            const id = req.params.id;
            const doc = await repo.findById(id)
            if (
                doc?.role! &&
                doc?.role === allowed &&
                forbidden.includes(req?.user?.role!)
            ) {
                console.log('next')
                return next(new AppError(`Only ${allowed}s are allowed.`, 403))
            }
            next()
        })
    }