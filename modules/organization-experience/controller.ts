import { factory }  from "../common/handler-factory"
import {organizationExperienceRepository} from "./repository";

export const getAll = factory.getAll(organizationExperienceRepository)

export const getOne =  factory.getOne(organizationExperienceRepository)

export const create = factory.create(organizationExperienceRepository)

export const update = factory.update(organizationExperienceRepository)

export const destroy = factory.destroy(organizationExperienceRepository)
