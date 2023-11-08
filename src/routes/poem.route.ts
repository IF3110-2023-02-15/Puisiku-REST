import { Router } from 'express'

import PoemController from '../controllers/poem.controller'
import { validate } from '../middlewares/validate.middleware'
import { addPoemDto } from '../domains/dto/poem.dto'

const router = Router()

const poemController = new PoemController()

router.get('/', poemController.getAllPoems)
router.get('/:id', poemController.)
router.post('/', validate(addPoemDto), poemController.createPoem)

export default router