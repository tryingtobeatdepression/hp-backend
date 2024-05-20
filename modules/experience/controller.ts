import { NextFunction, Response, Request } from "express";
import { experienceRepository } from "./repository";
import catchAsync from "../../utils/catch-async";
import { AppError } from "../common/errors";

export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const experiences = await experienceRepository.findAll()
    res.status(200).json({
        status: 'success',
        results: experiences
    })
});

export const getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    const experience = await experienceRepository.findById(id)
    if (!experience) {
        return next(new AppError("No Experience found with that ID", 404));
    }
    res.status(200).json({
        status: 'success',
        experience
    })
});

export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const experience = await experienceRepository.create(body)
    res.status(200).json({
        status: 'success',
        experience
    })
})

export const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const id = req.params.id

    if (! await experienceRepository.findById(id)) {
        return next(new AppError("No Experience found with that ID", 404));
    }
    const experience = await experienceRepository.updateById(id, body)
    res.status(200).json({
        status: 'success',
        experience
    })
})

export const destroy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!await experienceRepository.findById(id)) {
        return next(new AppError("No Experience found with that ID", 404));
    }

    await experienceRepository.deleteById(id)
    res.status(204).json()
})