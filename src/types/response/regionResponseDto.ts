import { z } from 'zod'
import { regionSchema } from '../entity/region.entity'

export const regionResponseSchema = regionSchema.pick({
  region_id: true,
  region_name: true,
  created_at: true,
  updated_at: true
})
export type RegionResponseDto = z.infer<typeof regionResponseSchema>
