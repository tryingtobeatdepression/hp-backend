import CrudRepository from "../../mongo/repositories/crud.repo";
import {NextFunction,Request, Response} from "express";
import catchAsync from "../../utils/catch-async";
import {AppError} from "./errors";

interface IdsMappings {
    [key: string]: string
}

const getAll = (repository: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const docs = await repository.findAll(req.query)
        res.status(200).json({
            status: 'success',
            results: docs
        });
    });

const getOne = (repository: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repository.findById(id);
        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(200).json({
            status: 'success',
            document
        });
    });

const create = (repository: CrudRepository<any>, idsMappings?: IdsMappings) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (idsMappings) {
            for (const [idKey, attrName] of Object.entries(idsMappings!)) {
                if (req.body[idKey] !== undefined) {
                    req.body[attrName] = req.body[idKey];
                    delete req.body[idKey]; 
                }
            } 
        }
        const document = await repository.create(req.body);
        res.status(200).json({
            status: 'success',
            document
        });
    });

const update = (repository: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repository.updateById(id, req.body);
        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(200).json({
            status: 'success',
            document
        });
    });

const destroy = (repository: CrudRepository<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const document = await repository.deleteById(id);
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