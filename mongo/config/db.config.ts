import { Express } from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env`})

export default async function(app: Express) {
    try {
        console.log('Waiting for db connection..')
        let connection = await mongoose.connect(`${process.env.MONGO_URL}`,)
        if (connection) console.log('Connected to DB!')
    } catch (e: any) {
        console.log(`Couldn't connect to DB! ${e}`)
    }
}