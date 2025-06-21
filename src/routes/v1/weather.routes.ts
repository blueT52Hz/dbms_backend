import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/wrapHandler.util'
import weatherController from '~/controllers/weather.controller'
import weatherRepository from '~/repositories/implementations/WeatherRepository'

const weatherRouter = Router()

// weatherRouter.get('/current/:city_slug', wrapRequestHandler(weatherController.getCurrentWeather))
// weatherRouter.post('/update', wrapRequestHandler(weatherController.updateWeather))
// weatherRouter.post('/update/:city_slug', wrapRequestHandler(weatherController.updateWeatherByCitySlug))
weatherRouter.get('/current/all-regions', wrapRequestHandler(weatherController.getAllRegionsWeather))
weatherRouter.get('/detail/:city_id', wrapRequestHandler(weatherController.getCityWeatherDetail))
weatherRouter.get(
  '/history/city/:city_id',
  wrapRequestHandler(async (req, res, next) => {
    const { city_id } = req.params
    const data = await weatherRepository.findCityWeatherHistory(city_id)
    res.status(200).json({
      success: true,
      message: 'Lấy lịch sử thời tiết thành công',
      data
    })
  })
)

weatherRouter.get(
  '/history/all-cities',
  wrapRequestHandler(async (req, res, next) => {
    const data = await weatherRepository.findAllCitiesWeatherHistory()
    res.status(200).json({
      success: true,
      message: 'Lấy lịch sử thời tiết tất cả các thành phố thành công',
      data
    })
  })
)

export default weatherRouter
