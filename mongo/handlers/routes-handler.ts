import { Express } from "express"
import * as adminRouter from '../../modules/admin/routes'
import * as experienceRouter from "../../modules/experience/routes";
import * as projectRouter from "../../modules/project/routes";
export default function (app: Express) {
    app.use('/api/admins/', adminRouter.router)
    app.use('/api/experiences',experienceRouter.router)
    app.use('/api/projects',projectRouter.router)
}