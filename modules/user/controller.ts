import { userRepo } from "../../mongo/repositories/user.repo"
import { factory } from '../common/handler-factory'


export const list = factory.getAll(userRepo)

export const create = factory.create(userRepo)

export const update = factory.update(userRepo)

export const destroy = factory.destroy(userRepo)

export const findOne = factory.getOne(userRepo)