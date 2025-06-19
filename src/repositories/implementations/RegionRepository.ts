import prisma from '~/config/prisma'
import { PrismaClient } from '@prisma/client'
import { IRegionRepository } from '../interfaces/IRegionRepository'
import { regionResponseSchema } from '~/dtos/response/regionResponseDto'
import { RegionResponseDto } from '~/dtos/response/regionResponseDto'

class RegionRepository implements IRegionRepository {
  constructor(private prisma: PrismaClient) {}
  async findRegionByRegionId(regionId: string): Promise<RegionResponseDto | null> {
    const region = await this.prisma.region.findUnique({
      where: { region_id: regionId }
    })
    return region ? regionResponseSchema.parse(region) : null
  }

  async findRegionByName(regionName: string): Promise<RegionResponseDto | null> {
    const region = await this.prisma.region.findUnique({
      where: { region_name: regionName }
    })
    return region ? regionResponseSchema.parse(region) : null
  }
}

const regionRepository = new RegionRepository(prisma)
export default regionRepository
