import { AirQualityEntity } from '~/types/entity/air.entity'
import { CityEntity } from '~/types/entity/city.entity'
import { RegionEntity } from '~/types/entity/region.entity'
import { WeatherHistoryEntity } from '~/types/entity/weather.entity'

export type FindAllCitiesWeatherEntity = RegionEntity & {
  cities: (CityEntity & { weather_histories: (WeatherHistoryEntity & { air_quality: AirQualityEntity })[] })[]
}
export interface IWeatherRepository {
  findAllCitiesWeather(): Promise<FindAllCitiesWeatherEntity[]>
  findCityWeatherDetail(city_id: string): Promise<any>
}
