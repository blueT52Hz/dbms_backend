import {
  CreateWeatherRepositoryDto,
  CurrentWeatherResponseDto,
  createWeatherRepositorySchema
} from '~/dtos/response/weatherResponseDto'
import weatherRepository from '~/repositories/implementations/WeatherRepository'
import { IWeatherRepository } from '~/repositories/interfaces/IWeatherRepository'
import crawlerService from './crawler.service'
import cityService from './city.service'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import { AppError } from '~/middlewares/errorHandler.middleware'
import regionService from './region.service'
import { CityResponseDto } from '~/dtos/response/cityResponseDto'
import { omit } from 'lodash'

export class WeatherService {
  constructor(private weatherRepository: IWeatherRepository) {}

  async getCurrentWeather(city: CityResponseDto): Promise<CurrentWeatherResponseDto> {
    const region = await regionService.getRegionByRegionId(city.region_id)
    const weather = await crawlerService.crawlCurrentWeather(city)
    if (!weather) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy thông tin thời tiết của thành phố ' + city.city_name)
    }
    return {
      city: {
        city_name: city.city_name
      },
      region: {
        region_name: region.region_name
      },
      weather
    }
  }

  async getCurrentWeatherByCity(city: CityResponseDto): Promise<CurrentWeatherResponseDto | null> {
    const region = await regionService.getRegionByRegionId(city.region_id)
    const weather = await crawlerService.crawlCurrentWeather(city)
    if (!weather) {
      return null
    }
    return {
      city: {
        city_name: city.city_name
      },
      region: {
        region_name: region.region_name
      },
      weather
    }
  }

  async updateWeather() {
    const cities = await cityService.getAllCities()
    const chunks: {
      city_id: string
      city_name: string
      slug: string
      region_id: string
      created_at: Date
      updated_at: Date
    }[][] = []
    const chunkSize = 5
    for (let i = 0; i < cities.length; i += chunkSize) {
      chunks.push(cities.slice(i, i + chunkSize))
    }
    const results = []
    for (const chunk of chunks) {
      const weatherData = (await Promise.all(chunk.map((city) => crawlerService.crawlCurrentWeather(city)))).filter(
        (result) => result !== null
      )
      const formattedWeather: CreateWeatherRepositoryDto[] = weatherData.map((weather) => {
        return {
          ...weather,
          air_quality: {
            create: weather.air_quality
          }
        }
      })
      const result = await Promise.all(formattedWeather.map((weather) => this.weatherRepository.createWeather(weather)))
      const formattedResult = result.map((result) => {
        return {
          city_name:
            chunk.find((city) => city.city_id === result.city_id)?.city_name || 'Không xác định tên Tỉnh/Thành phố ',
          ...omit(result, 'city_id')
        }
      })
      results.push(...formattedResult)
    }

    return results
  }

  async updateWeatherByCity(city: CityResponseDto) {
    const weather = await crawlerService.crawlCurrentWeather(city)
    if (!weather) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy thông tin thời tiết của thành phố ' + city.city_name)
    }
    const formattedWeather: CreateWeatherRepositoryDto = {
      ...weather,
      air_quality: {
        create: weather.air_quality
      }
    }
    const parsedWeather = createWeatherRepositorySchema.parse(formattedWeather)

    const weatherData = await this.weatherRepository.createWeather(parsedWeather)
    return weatherData
  }
}

const weatherService = new WeatherService(weatherRepository)
export default weatherService
