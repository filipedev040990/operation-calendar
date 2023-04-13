import express from 'express'
import cors from 'cors'
import { router } from './routes'
import setupSwagger from './adapters/swagger.adapter'

const app = express()

setupSwagger(app)
app.use(cors())
app.use(express.json())
app.use('/api', router)

export { app }
