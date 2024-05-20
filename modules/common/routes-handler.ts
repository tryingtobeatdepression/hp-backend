import { Express } from "express"
import * as userRouter from '../user/routes'
import * as authRouter from '../auth/routes'
import * as experienceRouter from "../experience/routes";

export default function (app: Express) {
    app.use('/api/users/', userRouter.router)
    app.use('/api/auth/', authRouter.router)
    app.use('/api/experiences',experienceRouter.router)
}