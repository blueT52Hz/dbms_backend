import { z } from 'zod'

export const weatherHistorySchema = z.object({
  weather_id: z.string(),
  city_id: z.string(),
  temp_current: z.number(), // Nhiệt độ hiện tại
  temp_min: z.number(), // Nhiệt độ tối thiểu
  temp_max: z.number(), // Nhiệt độ tối đa
  temp_feels_like: z.number(), // Nhiệt độ cảm nhận
  description: z.string(), // Mô tả thời tiết
  humidity: z.number(), // Độ ẩm
  visibility: z.number(), // Tầm nhìn
  wind_speed: z.number(), // Tốc độ gió
  rain_amount: z.number(), // Lượng mưa
  uv: z.number(), // Tia cực tím
  created_at: z.date(), // Ngày tạo
  updated_at: z.date() // Ngày cập nhật
})

export type WeatherHistoryEntity = z.infer<typeof weatherHistorySchema>
