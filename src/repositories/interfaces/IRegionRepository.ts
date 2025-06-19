import { RegionResponseDto } from '~/dtos/response/regionResponseDto'

export interface IRegionRepository {
  findRegionByRegionId(regionId: string): Promise<RegionResponseDto | null>
  findRegionByName(regionName: string): Promise<RegionResponseDto | null>
}
