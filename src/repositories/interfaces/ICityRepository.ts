import { CityResponseDto } from '~/dtos/response/cityResponseDto'

export interface ICityRepository {
  findCityByName(cityName: string): Promise<CityResponseDto | null>
  findCityByCitySlug(citySlug: string): Promise<CityResponseDto | null>
  findAllCities(): Promise<CityResponseDto[]>
}
