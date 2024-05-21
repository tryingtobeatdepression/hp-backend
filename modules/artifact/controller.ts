import { factory } from "../common/handler-factory";
import { artifactRepo } from "./repository";

export const create = factory.create(artifactRepo)

export const list = factory.getAll(artifactRepo)

export const findOne = factory.getOne(artifactRepo)

export const update = factory.update(artifactRepo)

export const destroy = factory.destroy(artifactRepo)