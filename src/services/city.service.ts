import { ICityRepository } from '~/repositories/interfaces/ICityRepository'
import cityRepository from '~/repositories/implementations/CityRepository'
import { CityResponseDto } from '~/dtos/response/cityResponseDto'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import { AppError } from '~/middlewares/errorHandler.middleware'

export class CityService {
  constructor(private cityRepository: ICityRepository) {}

  async getCityByName(cityName: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findCityByName(cityName)
    if (!city) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy thành phố')
    }
    return city
  }

  async getCityByCitySlug(citySlug: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findCityByCitySlug(citySlug)
    if (!city) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy thành phố')
    }
    return city
  }

  async getAllCities(): Promise<CityResponseDto[]> {
    const cities = await this.cityRepository.findAllCities()
    return cities
  }
}

const cityService = new CityService(cityRepository)
export default cityService
