import express, { Express,} from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './mongo/handlers/routes-handler'

const app: Express = express()
app.use(express.json())
// Mongoose configuration of `app`
dbConfig(app)
// Routes handler of all `app` routers
routesHandler(app)

// Connect to server
app.listen(3500, () => {
    console.log('NodeJS development server has connected!')
})
