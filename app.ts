import express, { Express,} from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './mongo/handlers/routes-handler'

const app: Express = express()
app.use(express.json())
// Mongoose configuration of `app`
dbConfig(app)
// Routes handler of all `app` routers
routesHandler(app)

export default app