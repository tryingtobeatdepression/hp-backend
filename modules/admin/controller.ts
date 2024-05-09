import { IUser } from "../../mongo/models/user.schema"
import { Request, Response } from 'express'
import AdminRepo from "./repostiory"

export async function list(req: Request, res: Response) {
    try { 
        res.send('hello')
    } catch (e: any) {}
}

export async function create(req: Request, res: Response) {
    try {
        let payload: IUser = {
            username: "",
            password: "",
            email: "",
            name: "",
            role: 0,
        }

        console.log('payload', payload)
    } catch (e: any) {

    }
}
