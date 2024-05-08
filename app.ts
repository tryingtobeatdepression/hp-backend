import express, { Express, Request, Response } from 'express'

const app: Express = express()


app.listen(3500, () => {
    console.log('NodeJS development server has connected!')
})
