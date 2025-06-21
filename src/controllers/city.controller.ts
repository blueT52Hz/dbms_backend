import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.constant'
import cityService, { CityService } from '~/services/city.service'

class CityController {
  constructor(private cityService: CityService) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((prop) => typeof (this as any)[prop] === 'function')
      .forEach((method) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(this as any)[method] = (this as any)[method].bind(this)
      })
  }

  async getAllCities(req: Request, res: Response) {
    const cities = await this.cityService.getAllCities()
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Lấy danh sách thành phố thành công',
      data: { cities }
    })
  }
}

const cityController = new CityController(cityService)
export default cityController
