import express, { Express,} from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './mongo/handlers/routes-handler'
import { router as experienceRouter } from  './modules/experience/routes'
import globalError from './modules/common/errors'

const app: Express = express()
app.use(express.json())
// Mongoose configuration of `app`
dbConfig(app)
// Routes handler of all `app` routers
routesHandler(app)

app.use('/experiences',experienceRouter)


app.use(globalError);

export default app