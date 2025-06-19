import express, { Application, ErrorRequestHandler } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression, { CompressionOptions } from 'compression'
import rateLimit from 'express-rate-limit'
import { env } from '~/config/env'
import cookieParser from 'cookie-parser'
import HTTP_STATUS from '~/constants/httpStatus.constant'
// File tự viết
import indexRoute from '~/routes/index.routes'
import { errorHandler } from '~/middlewares/errorHandler.middleware'

// Type-safe configuration
const compressionOptions: CompressionOptions = {
  level: 6, // Mức nén cân bằng (1-9)
  threshold: '1kb', // Chỉ nén response > 1KB
  filter: (req: express.Request, res: express.Response): boolean => {
    const contentType = res.getHeader('Content-Type')

    // Type guard cho header Content-Type
    if (typeof contentType !== 'string') return true

    // Bỏ qua các loại content đã nén sẵn
    const excludedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'video/webm',
      'application/octet-stream'
    ]

    return !excludedTypes.some((type) => contentType.includes(type))
  }
}

const corsOptions = {
  origin: [
    env.CLIENT_URL // URL frontend chính
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Custom-Header'],
  credentials: true, // Cho phép gửi cookies qua CORS
  maxAge: 86400, // Thời gian cache preflight request (24h)
  preflightContinue: false,
  optionsSuccessStatus: 204
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // 100 request/IP trong 15 phút
  message: 'Quá nhiều request từ IP này, vui lòng thử lại sau 15 phút',
  standardHeaders: true, // Trả về header `RateLimit-*`
  legacyHeaders: false // Tắt header `X-RateLimit-*` cũ
})

const configApp = (app: Application) => {
  app.use(helmet()) // Bảo vệ header HTTP
  app.use(compression(compressionOptions)) // Nén HTTP responses
  app.use(cookieParser())
  app.use(express.json()) // Parse JSON bodies
  app.use(cors(corsOptions)) // Cho phép CORS
  app.use(limiter) // Giới hạn số lượng request tránh DDOS

  app.use('/api/v1', indexRoute)
  // Xử lý lỗi 404
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: 'fail',
      message: `Không tìm thấy ${req.method} ${req.originalUrl}`
    })
  })
  app.use(errorHandler as ErrorRequestHandler)
}

export default configApp
