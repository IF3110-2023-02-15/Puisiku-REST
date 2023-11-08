import { Router } from 'express'

import FileController from '../controllers/file.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { upload } from '../middlewares/multer.middleware'

const router = Router()

const fileController = new FileController()

router.post(
  '/img',
  authenticate,
  upload.image.single('file'),
  fileController.uploadImage
)
router.post(
  '/audio',
  authenticate,
  upload.audio.single('file'),
  fileController.uploadAudio
)

export default router
