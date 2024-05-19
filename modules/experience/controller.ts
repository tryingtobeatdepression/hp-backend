import {experienceRepository} from "./repository";
import { factory }  from "../common/handler-factory"

export const getAll = factory.getAll(experienceRepository)

export const getOne =  factory.getOne(experienceRepository)

export const create = factory.create(experienceRepository)

export const update = factory.update(experienceRepository)

export const destroy = factory.destroy(experienceRepository)