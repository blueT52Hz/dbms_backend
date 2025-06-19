import { z } from 'zod'

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable()
})

export type UserResponseDto = z.infer<typeof userResponseSchema>
