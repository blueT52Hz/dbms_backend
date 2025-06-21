import weatherRepository from '~/repositories/implementations/WeatherRepository'
import { FindAllCitiesWeatherEntity, IWeatherRepository } from '~/repositories/interfaces/IWeatherRepository'

export class WeatherService {
  constructor(private weatherRepository: IWeatherRepository) {}

  async getAllCitiesWeather(): Promise<FindAllCitiesWeatherEntity[]> {
    const weathers = await this.weatherRepository.findAllCitiesWeather()
    return weathers
  }

  async getCityWeatherDetail(city_id: string): Promise<any> {
    const city = await this.weatherRepository.findCityWeatherDetail(city_id)
    return city
  }
}

const weatherService = new WeatherService(weatherRepository)
export default weatherService
