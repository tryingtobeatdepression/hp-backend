import { factory }  from "../common/handler-factory"
import {impactFundsRepository} from "./repository";

export const getAll = factory.getAll(impactFundsRepository)

export const getOne =  factory.getOne(impactFundsRepository)

export const create = factory.create(impactFundsRepository)

export const update = factory.update(impactFundsRepository)

export const destroy = factory.destroy(impactFundsRepository)
