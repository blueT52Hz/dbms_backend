import { Router } from 'express'
import weatherRouter from './v1/weather.routes'
import cityRouter from './v1/city.routes'
const router = Router()

router.use('/weathers', weatherRouter)
router.use('/cities', cityRouter)

export default router
