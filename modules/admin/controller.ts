import { Request, Response } from 'express'
import UserRepo from "../../mongo/repositories/user.repo"
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

// User Repo
const userRepo = new UserRepo()

/******
 * 
 * 
*/
interface CreateUserDto {
    username: string
    name: string
    email: string
    password: string
    role?: number // visitor
}


export async function list(req: Request, res: Response) {
    try {
        const users = await userRepo.find()
        return res.status(StatusCodes.OK).json(users)
    } catch (e) { }
}

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

