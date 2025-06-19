import { Request } from 'express'
import { ZodSchema } from 'zod'
import { AppError } from './errorHandler.middleware'
import HTTP_STATUS from '~/constants/httpStatus.constant'

const parseRequest = <T>(
  schema: ZodSchema,
  position: 'body' | 'query' | 'params' | 'headers' | 'cookies',
  req: Request
) => {
  const result = schema.safeParse(req[position])

  if (!result.success) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Validation error', result.error.flatten().fieldErrors)
  }

  return result.data as T
}

export default parseRequest
