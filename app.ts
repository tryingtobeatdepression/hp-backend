import express, { Express,} from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './modules/common/routes-handler'
import globalError from './modules/common/errors'
import cors from 'cors'

const app: Express = express()
app.use(express.json())
app.use(cors({
    origin: "*",
    allowedHeaders: "*",
}))

declare global {
    namespace Express {
        interface Request {
            user?: {    
                id: string, role: string
            }
        }
    }
}

dbConfig()
routesHandler(app)
app.use(globalError);

export default app