import prisma from '~/config/prisma'
import { IWeatherRepository } from '../interfaces/IWeatherRepository'
import { PrismaClient } from '@prisma/client'
import {
  CreateWeatherRepositoryDto,
  CreateWeatherResponseDto,
  createWeatherResponseSchema
} from '~/dtos/response/weatherResponseDto'

class WeatherRepository implements IWeatherRepository {
  constructor(private prisma: PrismaClient) {}

  async createWeather(data: CreateWeatherRepositoryDto): Promise<CreateWeatherResponseDto> {
    const newWeather = await this.prisma.weatherHistory.create({
      data,
      include: {
        air_quality: true
      }
    })
    return createWeatherResponseSchema.parse(newWeather)
  }

  async createWeathers(data: CreateWeatherRepositoryDto[]): Promise<CreateWeatherResponseDto[]> {
    const newWeathers = await this.prisma.weatherHistory.createManyAndReturn({
      data
    })
    return newWeathers.map((newWeather) => createWeatherResponseSchema.parse(newWeather))
  }
}

const weatherRepository = new WeatherRepository(prisma)
export default weatherRepository
