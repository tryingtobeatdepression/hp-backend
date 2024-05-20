import CrudRepository from "../../mongo/repositories/crud.repo";
import {NextFunction,Request, Response} from "express";
import catchAsync from "../../utils/catch-async";
import {AppError} from "./errors";

const getAll = (repositry: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const docs = await repositry.findAll();
        res.status(200).json({
            status: 'success',
            results: docs
        });
    });

const getOne = (repositry: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repositry.findById(id);
        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(200).json({
            status: 'success',
            document
        });
    });

const create = (repositry: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const document = await repositry.create(req.body);
        res.status(200).json({
            status: 'success',
            document
        });
    });

const update = (repositry: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repositry.updateById(id, req.body);
        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(200).json({
            status: 'success',
            document
        });
    });

const destroy = (repositry: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repositry.deleteById(id);
        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(204).json();
    });

export const factory ={getAll,getOne,create,update,destroy};

// const getWord = (repoName: string): string | null => {
//     const match = repoName.match(/^\s*(\S+)/);
//     return match? match[1] : null;
// }