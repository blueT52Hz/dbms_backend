import { z } from 'zod'

export const cityResponseSchema = z.object({
  city_id: z.string(),
  city_name: z.string(),
  slug: z.string(),
  region_id: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

export type CityResponseDto = z.infer<typeof cityResponseSchema>
