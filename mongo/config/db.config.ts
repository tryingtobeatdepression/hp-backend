import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env.example`})

export default async function() {
    try {
        console.log('Waiting for db connection..')
        console.log(`${JSON.stringify(process.env.MONGO_URL)}`)
        let connection = await mongoose.connect(`${process.env.MONGO_URL}`,)
        if (connection) console.log('Connected to DB!')
    } catch (e: any) {
        console.log(`Couldn't connect to DB! ${e}`)
    }
}