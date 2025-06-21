import { PrismaClient } from '@prisma/client'
import { IUserRepository } from '~/repositories/interfaces/IUserRepository'
import { CreateUserDto } from '~/types/request/user.dto'
import { UserResponseDto, userResponseSchema } from '~/types/response/user.dto'
import prisma from '~/config/prisma'

class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    if (!user) return null
    return userResponseSchema.parse(user)
  }

  async findUserByUserId(userId: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!user) return null
    console.log(user)

    return userResponseSchema.parse(user)
  }

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.create({
      data: userData
    })
    return userResponseSchema.parse(user)
  }
}

const userRepository = new UserRepository(prisma)
export default userRepository
