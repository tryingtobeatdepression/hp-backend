import { factory } from "../common/handler-factory";
import { userExpBookingRepo } from "./repository";

export const create = factory.create(userExpBookingRepo)

export const list = factory.getAll(userExpBookingRepo)

export const update = factory.update(userExpBookingRepo)

export const destroy = factory.destroy(userExpBookingRepo)

export const findOne = factory.getOne(userExpBookingRepo)