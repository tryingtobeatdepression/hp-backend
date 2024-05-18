import app from "./app"
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/.env`})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('NodeJS development server has connected!')
})
