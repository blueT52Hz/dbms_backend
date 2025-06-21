import prisma from '~/config/prisma'
import { PrismaClient } from '@prisma/client'
import { ICityRepository } from '../interfaces/ICityRepository'
import { cityResponseSchema } from '~/types/response/cityResponseDto'
import { CityResponseDto } from '~/types/response/cityResponseDto'

class CityRepository implements ICityRepository {
  constructor(private prisma: PrismaClient) {}
  async findCityByName(cityName: string): Promise<CityResponseDto | null> {
    const city = await this.prisma.city.findUnique({
      where: { city_name: cityName }
    })
    return city ? cityResponseSchema.parse(city) : null
  }

  async findCityByCitySlug(citySlug: string): Promise<CityResponseDto | null> {
    const city = await this.prisma.city.findUnique({
      where: { slug: citySlug }
    })
    return city ? cityResponseSchema.parse(city) : null
  }

  async findAllCities(): Promise<CityResponseDto[]> {
    const cities = await this.prisma.city.findMany()
    return cities.map((city) => cityResponseSchema.parse(city))
  }
}

const cityRepository = new CityRepository(prisma)
export default cityRepository
