import { z } from 'zod'
import { citySchema } from '../entity/city.entity'

export const cityResponseSchema = citySchema.pick({
  city_id: true,
  city_name: true,
  slug: true,
  region_id: true,
  created_at: true,
  updated_at: true
})

export type CityResponseDto = z.infer<typeof cityResponseSchema>
