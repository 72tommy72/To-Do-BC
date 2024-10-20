import express from 'express'
import dotenv from 'dotenv'
import { appRouter } from './src/appRouter.js'
import { connectionDB } from './DB/connectionDB.js'

dotenv.config()
const app = express()
const port = process.env.PORT

appRouter(app ,express)
connectionDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))