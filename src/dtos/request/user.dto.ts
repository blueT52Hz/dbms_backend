import { z } from 'zod'
import { USER_MESSAGE } from '~/constants/message.constant'

export const createUserSchema = z.object({
  email: z.string({ required_error: USER_MESSAGE.EMAIL_REQUIRED }).email(USER_MESSAGE.EMAIL_INVALID),
  password: z.string({ required_error: USER_MESSAGE.PASSWORD_LENGTH_INVALID }).min(6),
  name: z.string().min(1, USER_MESSAGE.NAME_LENGTH_INVALID).max(50, USER_MESSAGE.NAME_LENGTH_INVALID).optional()
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const getUserByIdSchema = z.object({
  userId: z.string({ required_error: USER_MESSAGE.USER_ID_NOT_FOUND }).uuid({ message: USER_MESSAGE.USER_ID_INVALID })
})

export type CreateUserDto = z.infer<typeof createUserSchema>
export type LoginUserDto = z.infer<typeof loginUserSchema>
export type GetUserByIdDto = z.infer<typeof getUserByIdSchema>
