import { Router } from 'express'

import { validate } from '../middlewares/validate.middleware'
import { authenticate } from '../middlewares/auth.middleware'
import UserController from '../controllers/user.controller'
import { updateProfileDto } from '../domains/dto/user.dto'

const router = Router()

const userController = new UserController()

router.get('/creators', authenticate, userController.getCreators)
router.get('/', authenticate, userController.getProfile)
router.patch(
  '/',
  authenticate,
  validate(updateProfileDto),
  userController.updateProfile
)

export default router
