import { Express } from "express"
import * as adminRouter from '../../modules/admin/routes'

export default function (app: Express) {
    app.use('/api/admins/', adminRouter.router)
}