import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { factory } from "../common/handler-factory";
import { artifactRepo } from "./repository";

const idsMappings = {
    id: 'organization',
}

export const create = factory.create(artifactRepo, idsMappings)

export const list = factory.getAll(artifactRepo)

export const findOne = factory.getOne(artifactRepo)

export const update = factory.update(artifactRepo)

export const destroy = factory.destroy(artifactRepo)
