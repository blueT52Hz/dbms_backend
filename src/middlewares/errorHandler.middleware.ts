// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.constant'
// Custom error class (tuỳ chọn)
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public details?: Record<string, any> | any[],
    public isOperational: boolean = true
  ) {
    super(message)
  }
}

// Error Handler chung
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log lỗi ra console/File (Production: dùng Winston)
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message)

  // Xử lý lỗi cụ thể
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
  }

  // Lỗi không xác định
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
