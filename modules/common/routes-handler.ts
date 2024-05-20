import { Express } from "express"
import * as userRouter from '../user/routes'
import * as authRouter from '../auth/routes'
import * as experienceRouter from "../experience/routes";
import * as projectRouter from "../project/routes";
import * as impactFundsRouter from "../impact-funds/routes";

export default function (app: Express) {
    app.use('/api/users/', userRouter.router)
    app.use('/api/auth/', authRouter.router)
    app.use('/api/experiences',experienceRouter.router)
    app.use('/api/projects',projectRouter.router)
    app.use('/api/impact-funds',impactFundsRouter.router)

}