import { z } from 'zod'
import { cityResponseSchema } from './cityResponseDto'
import { regionResponseSchema } from './regionResponseDto'

export const weatherResponseDto = z.object({
  weather_id: z.string(),
  city_id: z.string(),
  temp_current: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  temp_feels_like: z.number(),
  description: z.string(),
  humidity: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  uv: z.number(),
  rain_amount: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  air_quality: z.object({
    quality: z.string(),
    co: z.number(),
    nh3: z.number(),
    no: z.number(),
    no2: z.number(),
    o3: z.number(),
    so2: z.number(),
    pm2_5: z.number(),
    pm10: z.number()
  })
})

export const currentWeatherResponseSchema = z.object({
  city: cityResponseSchema.pick({
    city_name: true
  }),
  weather: weatherResponseDto.omit({
    weather_id: true,
    created_at: true,
    updated_at: true
  }),
  region: regionResponseSchema.pick({
    region_name: true
  })
})

export const createWeatherRepositorySchema = z.object({
  city_id: z.string(),
  temp_current: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  temp_feels_like: z.number(),
  description: z.string(),
  humidity: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  uv: z.number(),
  rain_amount: z.number(),
  air_quality: z.object({
    create: z.object({
      quality: z.string(),
      co: z.number(),
      nh3: z.number(),
      no: z.number(),
      no2: z.number(),
      o3: z.number(),
      so2: z.number(),
      pm2_5: z.number(),
      pm10: z.number()
    })
  })
})

export const createWeatherResponseSchema = z.object({
  city_id: z.string(),
  temp_current: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  temp_feels_like: z.number(),
  description: z.string(),
  humidity: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  uv: z.number(),
  rain_amount: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  air_quality: z.object({
    quality: z.string(),
    co: z.number(),
    nh3: z.number(),
    no: z.number(),
    no2: z.number(),
    o3: z.number(),
    so2: z.number(),
    pm2_5: z.number(),
    pm10: z.number()
  })
})

export const crawlerWeatherReturnSchema = z.object({
  city_id: z.string(),
  temp_current: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  temp_feels_like: z.number(),
  description: z.string(),
  humidity: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  uv: z.number(),
  rain_amount: z.number(),
  air_quality: z.object({
    quality: z.string(),
    co: z.number(),
    nh3: z.number(),
    no: z.number(),
    no2: z.number(),
    o3: z.number(),
    so2: z.number(),
    pm2_5: z.number(),
    pm10: z.number()
  })
})

export type CurrentWeatherResponseDto = z.infer<typeof currentWeatherResponseSchema>
export type CreateWeatherRepositoryDto = z.infer<typeof createWeatherRepositorySchema>
export type CreateWeatherResponseDto = z.infer<typeof createWeatherResponseSchema>
export type CrawlerWeatherReturnDto = z.infer<typeof crawlerWeatherReturnSchema>
