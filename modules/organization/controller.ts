import { factory } from "../common/handler-factory";
import { organizationRepo } from "./repository";

export const create = factory.create(organizationRepo)

export const list = factory.getAll(organizationRepo)

export const findOne = factory.getOne(organizationRepo)

export const destroy = factory.destroy(organizationRepo)

export const update = factory.update(organizationRepo)