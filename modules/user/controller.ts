import { Request, Response } from "express"
import { userRepo } from "../../mongo/repositories/user.repo"
import catchAsync from "../../utils/catch-async"
import { factory } from '../common/handler-factory'
import { AppError } from "../common/errors"
import { ErrorMessages } from "../../enums/errors.enum"

export const list = factory.getAll(userRepo)

export const create = factory.create(userRepo)

export const update = factory.update(userRepo)

export const destroy = factory.destroy(userRepo)

export const findOne = factory.getOne(userRepo)