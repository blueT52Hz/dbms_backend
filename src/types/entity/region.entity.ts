import { z } from 'zod'

export const regionSchema = z.object({
  region_id: z.string(),
  region_name: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

export type RegionEntity = z.infer<typeof regionSchema>
