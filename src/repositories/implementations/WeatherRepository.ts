import prisma from '~/config/prisma'
import { IWeatherRepository, FindAllCitiesWeatherEntity } from '~/repositories/interfaces/IWeatherRepository'
import { PrismaClient } from '@prisma/client'

class WeatherRepository implements IWeatherRepository {
  constructor(private prisma: PrismaClient) {}

  async findAllCitiesWeather(): Promise<FindAllCitiesWeatherEntity[]> {
    const entities = await this.prisma.region.findMany({
      include: {
        cities: {
          include: {
            weather_histories: {
              orderBy: {
                created_at: 'desc'
              },
              take: 1,
              include: {
                air_quality: true
              }
            }
          }
        }
      }
    })
    return entities
  }

  async findCityWeatherDetail(city_id: string): Promise<any> {
    const entityPromise = this.prisma.city.findFirst({
      where: {
        city_id
      },
      include: {
        region: true,
        weather_histories: {
          orderBy: {
            created_at: 'desc'
          },
          take: 1,
          include: {
            air_quality: true
          }
        }
      }
    })

    const weatherAnalysisPromise = prisma.$queryRaw`
    SELECT 
      DATE(wh.created_at) as date,
      AVG(wh.temp_current) as avg_temp_current,
      AVG(wh.temp_min) as avg_temp_min,
      AVG(wh.temp_max) as avg_temp_max,
      AVG(wh.temp_feels_like) as avg_temp_feels_like,
      AVG(wh.humidity) as avg_humidity,
      AVG(wh.visibility) as avg_visibility,
      AVG(wh.wind_speed) as avg_wind_speed,
      AVG(wh.rain_amount) as avg_rain_amount,
      AVG(wh.uv) as avg_uv,
      AVG(aq.co) as avg_co,
      AVG(aq.no) as avg_no,
      AVG(aq.no2) as avg_no2,
      AVG(aq.o3) as avg_o3,
      AVG(aq.so2) as avg_so2,
      AVG(aq.pm2_5) as avg_pm2_5,
      AVG(aq.pm10) as avg_pm10,
      AVG(aq.nh3) as avg_nh3
    FROM 
      weather_histories wh
    LEFT JOIN 
      air_qualities aq ON wh.weather_id = aq.weather_id
    WHERE
      wh.city_id = ${city_id} and DATE(wh.created_at) >= DATE_TRUNC('month', CURRENT_DATE) and DATE(wh.created_at) < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    GROUP BY 
      DATE(wh.created_at)
  `

    const [city, weather_analysis] = await Promise.all([entityPromise, weatherAnalysisPromise])

    return {
      ...city,
      weather_analysis
    }
  }

  async findCityWeatherHistory(city_id: string): Promise<any> {
    const cityEnityPromise = this.prisma.city.findFirst({
      where: {
        city_id
      },
      include: {
        region: true,
        weather_histories: {
          orderBy: {
            created_at: 'desc'
          },
          take: 20,
          include: {
            air_quality: true
          }
        }
      }
    })

    const weatherAvgPromise = this.prisma.$queryRaw`
        select
        TO_CHAR(weather_histories.created_at, 'MM-YYYY') AS month,
        avg(weather_histories.temp_current) as avg_temp,
        avg(weather_histories.humidity) as avg_humidity,
        avg(weather_histories.rain_amount) as avg_rain_amount,
        avg(weather_histories.uv) as avg_uv,
        avg(weather_histories.visibility) as avg_visibility,
        avg(weather_histories.wind_speed) as avg_wind_speed,

        avg(air_qualities.co) as avg_co,
        avg(air_qualities.nh3) as avg_nh3,
        avg(air_qualities.no) as avg_no,
        avg(air_qualities.no2) as avg_no2,
        avg(air_qualities.o3) as avg_o3,
        avg(air_qualities.pm10) as avg_pm10,
        avg(air_qualities.pm2_5) as avg_pm2_5,
        avg(air_qualities.so2) as avg_so2

        from weather_histories
        join air_qualities
        on weather_histories.weather_id = air_qualities.weather_id
        where weather_histories.city_id = ${city_id}
        group by TO_CHAR(weather_histories.created_at, 'MM-YYYY')
        order by month
    `

    const [cityEntity, weatherAvgEntity] = await Promise.all([cityEnityPromise, weatherAvgPromise])
    return {
      ...cityEntity,
      weatherAvg: weatherAvgEntity
    }
  }

  async findAllCitiesWeatherHistory(): Promise<any> {
    const data = await this.prisma.$queryRaw`
      select 
        ct.city_name,
        to_char(wh.created_at, 'DD-MM-YYYY') as record_day,
        avg(wh.temp_current) as avg_temp,
        avg(wh.humidity) as avg_humidity,
        avg(wh.visibility) as avg_visibility,
        avg(wh.wind_speed) as avg_wind_speed,
        avg(wh.uv) as avg_uv,
        avg(aq.co) as avg_co,
        avg(aq.no) as avg_no,
        avg(aq.no2) as avg_no2,
        avg(aq.o3) as avg_o3,
        avg(aq.so2) as avg_so2,
        avg(aq.pm2_5) as avg_pm2_5,
        avg(aq.pm10) as avg_pm10,
        avg(aq.nh3) as avg_nh3
      from cities ct
      join weather_histories wh
      on ct.city_id = wh.city_id
      join air_qualities aq 
      on aq.weather_id = wh.weather_id
      where ct_city_id = "f44daa1c-ef46-43ab-b55c-cb91febf0c53"
      group by to_char(wh.created_at, 'DD-MM-YYYY'), ct.city_name
      order by ct.city_name
    `
    return data
  }

  async generateWeatherData() {
    const cities = await prisma.city.findMany()

    // Tạo mảng các ngày từ 1/1/2025 đến 18/6/2025
    const startDate = new Date('2025-01-01T07:00:00')
    const endDate = new Date('2025-06-18T07:00:00')
    const days: Date[] = []

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date))
    }

    const createPromises = cities.flatMap((city) => {
      return days.map((day) => {
        // Tạo giá trị ngẫu nhiên cho thời tiết
        const baseTemp = Math.random() * 15 + 15 // Nhiệt độ từ 15-30°C
        const tempCurrent = parseFloat((baseTemp + Math.random() * 5 - 2.5).toFixed(1))
        const tempMin = parseFloat((tempCurrent - Math.random() * 5).toFixed(1))
        const tempMax = parseFloat((tempCurrent + Math.random() * 5).toFixed(1))
        const humidity = Math.floor(Math.random() * 60 + 30) // Độ ẩm 30-90%
        const windSpeed = parseFloat((Math.random() * 15).toFixed(1)) // Gió 0-15 km/h
        const rainAmount = Math.random() > 0.7 ? parseFloat((Math.random() * 10).toFixed(1)) : 0 // 30% có mưa

        // Mô tả thời tiết dựa trên điều kiện
        let description = 'Trời trong'
        if (rainAmount > 5) description = 'Mưa to'
        else if (rainAmount > 0) description = 'Mưa nhẹ'
        else if (tempCurrent > 28) description = 'Nắng nóng'
        else if (tempCurrent < 18) description = 'Trời lạnh'

        return prisma.weatherHistory.create({
          data: {
            city_id: city.city_id,
            temp_current: tempCurrent,
            temp_min: tempMin,
            temp_max: tempMax,
            temp_feels_like: parseFloat((tempCurrent + (Math.random() - 0.5) * 2).toFixed(1)),
            description: description,
            humidity: humidity,
            visibility: Math.floor(Math.random() * 15 + 5), // Tầm nhìn 5-20km
            wind_speed: windSpeed,
            rain_amount: rainAmount,
            uv: parseFloat((Math.random() * 8 + 2).toFixed(1)), // UV 2-10
            created_at: day,
            updated_at: day,
            air_quality: {
              create: {
                quality: getAirQuality(),
                co: parseFloat((Math.random() * 0.5).toFixed(3)),
                no: parseFloat((Math.random() * 0.05).toFixed(3)),
                no2: parseFloat((Math.random() * 0.05).toFixed(3)),
                o3: parseFloat((Math.random() * 0.1).toFixed(3)),
                so2: parseFloat((Math.random() * 0.01).toFixed(3)),
                pm2_5: parseFloat((Math.random() * 50).toFixed(1)),
                pm10: parseFloat((Math.random() * 70).toFixed(1)),
                nh3: parseFloat((Math.random() * 0.01).toFixed(3)),
                created_at: day,
                updated_at: day
              }
            }
          }
        })
      })
    })

    // Chia nhỏ thành các batch để tránh quá tải
    const batchSize = 100
    for (let i = 0; i < createPromises.length; i += batchSize) {
      const batch = createPromises.slice(i, i + batchSize)
      await Promise.all(batch)
      console.log(`Đã tạo ${Math.min(i + batchSize, createPromises.length)}/${createPromises.length} bản ghi`)
    }
  }
}

const weatherRepository = new WeatherRepository(prisma)
export default weatherRepository

// Hàm xác định chất lượng không khí
function getAirQuality() {
  const rand = Math.random()
  if (rand > 0.9) return 'Rất xấu'
  if (rand > 0.7) return 'Xấu'
  if (rand > 0.4) return 'Trung bình'
  if (rand > 0.2) return 'Tốt'
  return 'Rất tốt'
}
