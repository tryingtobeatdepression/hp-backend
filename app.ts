import express, { Express, Request, Response } from 'express'
import dbConfig from './mongo/config/db.config'
import routesHandler from './mongo/handlers/routes-handler'

const app: Express = express()

dbConfig(app)
routesHandler(app)

app.listen(3500, () => {
    console.log('NodeJS development server has connected!')
})
