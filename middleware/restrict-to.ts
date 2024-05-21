import { Request, Response } from "express";
import { AppError } from "../modules/common/errors";
import CrudRepository from "../mongo/repositories/crud.repo";

export const restrictTo =
    (repos: CrudRepository<any>[], allowed: string[], forbidden: string[]) => {
        return (async (req: Request, res: Response, next: any) => {
            const id = req.params.id;
            repos.map(async (repo) => {
                const doc = await repo.findById(id)
                if (
                    doc?.role! &&
                    allowed.includes(doc?.role) &&
                    forbidden.includes(req?.user?.role!)
                ) {
                    console.log('next')
                    return next(new AppError(`Only [${allowed}] is allowed.`, 403))
                }
            })
            next()
        })
    }