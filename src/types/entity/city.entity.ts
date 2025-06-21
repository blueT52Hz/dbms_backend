import { z } from 'zod'

export const citySchema = z.object({
  city_id: z.string(),
  city_name: z.string(),
  slug: z.string(),
  region_id: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

export type CityEntity = z.infer<typeof citySchema>
