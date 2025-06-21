import { Router } from 'express'
import cityController from '~/controllers/city.controller'
import { wrapRequestHandler } from '~/utils/wrapHandler.util'

const cityRouter = Router()

cityRouter.get('/', wrapRequestHandler(cityController.getAllCities))

export default cityRouter
