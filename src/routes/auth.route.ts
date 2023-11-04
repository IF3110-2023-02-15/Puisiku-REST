import { Router } from 'express'

import AuthController from '../controllers/auth.controller'
import { validate } from '../middlewares/validate.middleware'
import { LoginDto, RegisterDto } from '../domains/dto/auth.dto'

const router = Router()

const authController = new AuthController()

router.post('/login', validate(LoginDto), authController.login)
router.post('/register', validate(RegisterDto), authController.register)

export default router
