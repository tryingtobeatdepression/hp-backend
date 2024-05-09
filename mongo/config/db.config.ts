import { Express } from 'express'
import mongoose from 'mongoose'

export default async function(app: Express) {
    try {
        console.log('Waiting for db connection..')
        let connection = await mongoose.connect('mongodb://127.0.0.1:27017/hp')
        if (connection) console.log('Connected to DB!')
    } catch (e: any) {
        console.log(`Couldn't connect to DB! ${e}`)
    } 
}