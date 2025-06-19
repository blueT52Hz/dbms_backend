import { userRepository, IUserRepository } from '~/repositories/index.repository'
import { CreateUserDto } from '~/dtos/request/user.dto'
import { UserResponseDto } from '~/dtos/response/user.dto'
import { AppError } from '~/middlewares/errorHandler.middleware'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import { USER_MESSAGE } from '~/constants/message.constant'

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findUserByEmail(userData.email)
    if (existingUser) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, USER_MESSAGE.USER_ALREADY_EXISTS)
    }
    const user = await this.userRepository.createUser(userData)
    return user
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserByUserId(userId)

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGE.USER_NOT_FOUND)
    }
    return user
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGE.USER_NOT_FOUND)
    }
    return user
  }

  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email)
    return !!user
  }
}

const userService = new UserService(userRepository)
export default userService
