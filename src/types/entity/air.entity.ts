import { z } from 'zod'

export const airQualitySchema = z.object({
  aqi_id: z.string(),
  weather_id: z.string(),
  quality: z.string(),
  co: z.number(),
  no: z.number(),
  no2: z.number(),
  o3: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  nh3: z.number(),
  created_at: z.date(),
  updated_at: z.date()
})

export type AirQualityEntity = z.infer<typeof airQualitySchema>
