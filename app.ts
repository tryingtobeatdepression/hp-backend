import express, { Express,} from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './modules/common/routes-handler'
import globalError from './modules/common/errors'

const app: Express = express()
app.use(express.json())

declare global {
    namespace Express {
        interface Request {
            user?: {    
                id: string, role: number
            }
        }
    }
}

// Mongoose configuration of `app`
dbConfig()
// Routes handler of all `app` routers
routesHandler(app)
app.use(globalError);

export default app