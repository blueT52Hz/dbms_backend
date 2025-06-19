import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/wrapHandler.util'
import weatherController from '~/controllers/weather.controller'

const weatherRouter = Router()

weatherRouter.get('/current/:city_slug', wrapRequestHandler(weatherController.getCurrentWeather))
weatherRouter.post('/update', wrapRequestHandler(weatherController.updateWeather))
weatherRouter.post('/update/:city_slug', wrapRequestHandler(weatherController.updateWeatherByCitySlug))

export default weatherRouter
