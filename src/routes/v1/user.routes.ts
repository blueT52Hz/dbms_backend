import { Router } from 'express'
import userController from '~/controllers/user.controller'
import { wrapRequestHandler } from '~/utils/wrapHandler.util'

const router = Router()

router.get('/:userId', wrapRequestHandler(userController.getUserById))
router.post('/', wrapRequestHandler(userController.createUser))

export default router
