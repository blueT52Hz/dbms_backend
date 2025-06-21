import { RegionResponseDto } from '~/types/response/regionResponseDto'

export interface IRegionRepository {
  findRegionByRegionId(regionId: string): Promise<RegionResponseDto | null>
  findRegionByName(regionName: string): Promise<RegionResponseDto | null>
}
