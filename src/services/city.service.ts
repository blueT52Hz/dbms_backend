import { ICityRepository } from '~/repositories/interfaces/ICityRepository'
import cityRepository from '~/repositories/implementations/CityRepository'
import { CityResponseDto } from '~/types/response/cityResponseDto'

export class CityService {
  constructor(private cityRepository: ICityRepository) {}

  async getAllCities(): Promise<CityResponseDto[]> {
    const cities = await this.cityRepository.findAllCities()
    return cities
  }
}

const cityService = new CityService(cityRepository)
export default cityService
