import { IRegionRepository } from '~/repositories/interfaces/IRegionRepository'
import regionRepository from '~/repositories/implementations/RegionRepository'
import { RegionResponseDto } from '~/types/response/regionResponseDto'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import { AppError } from '~/middlewares/errorHandler.middleware'

export class RegionService {
  constructor(private regionRepository: IRegionRepository) {}

  async getRegionByName(regionName: string): Promise<RegionResponseDto> {
    const region = await this.regionRepository.findRegionByName(regionName)
    if (!region) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy tỉnh')
    }
    return region
  }

  async getRegionByRegionId(regionId: string): Promise<RegionResponseDto> {
    const region = await this.regionRepository.findRegionByRegionId(regionId)
    if (!region) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Không tìm thấy tỉnh')
    }
    return region
  }
}

const regionService = new RegionService(regionRepository)
export default regionService
