import { CreateUserDto } from '~/dtos/request/user.dto'
import { UserResponseDto } from '~/dtos/response/user.dto'

export interface IUserRepository {
  findUserByEmail(email: string): Promise<UserResponseDto | null>
  findUserByUserId(userId: string): Promise<UserResponseDto | null>
  createUser(userData: CreateUserDto): Promise<UserResponseDto>
}
