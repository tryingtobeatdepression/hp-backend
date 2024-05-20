import { factory }  from "../common/handler-factory"
import {projectRepository} from "./repository";

export const getAll = factory.getAll(projectRepository)

export const getOne =  factory.getOne(projectRepository)

export const create = factory.create(projectRepository)

export const update = factory.update(projectRepository)

export const destroy = factory.destroy(projectRepository)
