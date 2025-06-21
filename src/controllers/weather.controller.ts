import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import weatherService from '~/services/weather.service'
import { WeatherService } from '~/services/weather.service'
class WeatherController {
  constructor(private weatherService: WeatherService) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((prop) => typeof (this as any)[prop] === 'function')
      .forEach((method) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(this as any)[method] = (this as any)[method].bind(this)
      })
  }

  async getAllRegionsWeather(req: Request, res: Response) {
    const regionsWeathers = await this.weatherService.getAllCitiesWeather()
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'Lấy dữ liệu thành công', data: { regionsWeathers } })
  }

  async getCityWeatherDetail(req: Request, res: Response) {
    const { city_id } = req.params
    const city = await this.weatherService.getCityWeatherDetail(city_id)
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'Lấy dữ liệu thành công', data: { city } })
  }

  // async getCurrentWeather(req: Request, res: Response) {
  //   const { city_slug } = parseRequest<CurrentWeatherRequestDto>(currentWeatherRequestSchema, 'params', req)
  //   const city = await cityService.getCityByCitySlug(city_slug)
  //   const weather = await this.weatherService.getCurrentWeather(city)
  //   res.status(HTTP_STATUS.OK).json({ weather })
  // }

  // async updateWeather(req: Request, res: Response) {
  //   const weathers = await this.weatherService.updateWeather()
  //   res.status(HTTP_STATUS.CREATED).json({
  //     success: 'Cập nhật thành công ' + weathers.length + ' tỉnh/thành phố',
  //     data: {
  //       results: weathers
  //     }
  //   })
  // }

  // async updateWeatherByCitySlug(req: Request, res: Response) {
  //   const { city_slug } = parseRequest<UpdateWeatherByCitySlugRequestDto>(
  //     updateWeatherByCitySlugRequestSchema,
  //     'params',
  //     req
  //   )
  //   const city = await cityService.getCityByCitySlug(city_slug)
  //   const weather = await this.weatherService.updateWeatherByCity(city)
  //   res.status(HTTP_STATUS.OK).json({ weather })
  // }
}

const weatherController = new WeatherController(weatherService)
export default weatherController
