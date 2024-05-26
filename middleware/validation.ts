import { Request, Response } from "express"
import { CreateArtifactDto } from "../modules/artifact/dto"
import { AppError } from "../modules/common/errors"


export const validateBody = () => {
    interface IRequest extends Request, CreateArtifactDto {}

    return async (req: IRequest, res: Response, next: any) => {
        for(const field in req.body) {
            // validate
            if(!field)
                next(new AppError('', 400))
        }
        next()
    }
}

// validateBody(CreateArtifactDto)

