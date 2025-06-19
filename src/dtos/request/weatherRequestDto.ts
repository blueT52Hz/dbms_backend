import { z } from 'zod'

export const currentWeatherRequestSchema = z.object({
  city_slug: z
    .string({ required_error: 'Không tìm thấy tên thành phố' })
    .nonempty({ message: 'Tên thành phố không được để trống' })
})

export const updateWeatherByCitySlugRequestSchema = z.object({
  city_slug: z
    .string({ required_error: 'Không tìm thấy tên thành phố' })
    .nonempty({ message: 'Tên thành phố không được để trống' })
})

export type CurrentWeatherRequestDto = z.infer<typeof currentWeatherRequestSchema>
export type UpdateWeatherByCitySlugRequestDto = z.infer<typeof updateWeatherByCitySlugRequestSchema>
