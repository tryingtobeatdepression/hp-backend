import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { factory } from "../common/handler-factory";
import { artifactRepo } from "./repository";

export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.params.id
    const payload = { organization: orgId, ...req.body }
    const document = await artifactRepo.create(payload);
    res.status(200).json({
        status: 'success',
        document
    });
})

export const list = factory.getAll(artifactRepo)

export const findOne = factory.getOne(artifactRepo)

export const update = factory.update(artifactRepo)

export const destroy = factory.destroy(artifactRepo)
