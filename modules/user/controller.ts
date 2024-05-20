import { Request, Response } from 'express'
import { userRepo } from "../../mongo/repositories/user.repo"
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { CreateUserDto } from './dto'
import { hashToken } from '../../utils/encryption'

// User Repo

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function list(req: Request, res: Response) {
    try {
        const users = await userRepo.findAll()
        return res.status(StatusCodes.OK).json(users)
    } catch (e) { }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function create(req: Request, res: Response) {
    try {
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: ReasonPhrases.BAD_REQUEST,
            })
        }
        let dto: CreateUserDto = req.body
        // Validation
        // Check if `username` already exists

        if (await userRepo.findByUsername(dto?.username!))
            // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
            return res.status(StatusCodes.CONFLICT).json({
                error: ReasonPhrases.CONFLICT,
            })

        // TODO: If `username` passes, validate fields
        // if fields are validated, save doc
        const user = await userRepo.create(dto)
        res.status(StatusCodes.OK).json(user)

    } catch (e: any) {
        console.log(e)
    }
}

