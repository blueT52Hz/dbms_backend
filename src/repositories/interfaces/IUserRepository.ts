import { CreateUserDto } from '~/types/request/user.dto'
import { UserResponseDto } from '~/types/response/user.dto'

export interface IUserRepository {
  findUserByEmail(email: string): Promise<UserResponseDto | null>
  findUserByUserId(userId: string): Promise<UserResponseDto | null>
  createUser(userData: CreateUserDto): Promise<UserResponseDto>
}
