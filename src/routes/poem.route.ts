import { Router } from 'express'

import { authenticate } from '../middlewares/auth.middleware'
import PoemController from '../controllers/poem.controller'
import { validate } from '../middlewares/validate.middleware'
import { addPoemDto } from '../domains/dto/poem.dto'

const router = Router()

const poemController = new PoemController()

router.get('/album/:albumId', authenticate, poemController.getAlbumPoems)
router.get('/', authenticate, poemController.getAllPoems)
router.get('/:id', authenticate, poemController.getPoemById)
router.post('/', authenticate, validate(addPoemDto), poemController.createPoem)

export default router
