import { Router } from 'express'
import weatherRouter from './v1/weather.routes'
const router = Router()

router.use('/weathers', weatherRouter)

export default router
