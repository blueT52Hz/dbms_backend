import { Request, Response } from 'express'
import userService, { UserService } from '~/services/user.service'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import { getUserByIdSchema } from '~/types/request/user.dto'

class UserController {
  constructor(private userService: UserService) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((prop) => typeof (this as any)[prop] === 'function')
      .forEach((method) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(this as any)[method] = (this as any)[method].bind(this)
      })
  }

  async createUser(req: Request, res: Response) {
    const { email, password, name } = req.body
    const user = await this.userService.createUser({ email, password, name })
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: user
    })
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = getUserByIdSchema.parse(req.params)
    const user = await this.userService.getUserById(userId)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Lấy thông tin user thành công',
      data: {
        user
      }
    })
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params
    const user = await this.userService.getUserByEmail(email)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User fetched successfully',
      data: {
        user
      }
    })
  }
}

const userController = new UserController(userService)
export default userController
