import { CreateWeatherRepositoryDto, CreateWeatherResponseDto } from '~/dtos/response/weatherResponseDto'

export interface IWeatherRepository {
  createWeather(weather: CreateWeatherRepositoryDto): Promise<CreateWeatherResponseDto>
  createWeathers(weathers: CreateWeatherRepositoryDto[]): Promise<CreateWeatherResponseDto[]>
}
