import { Router } from 'express'

import AlbumController from '../controllers/album.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'

import {
  addAlbumDto,
  deleteAlbumDto,
  getAlbumsByCreatorId,
  updateAlbumDto,
  getAlbum,
} from '../domains/dto/album.dto'

const router = Router()

const albumController = new AlbumController()

router.get('/creator', authenticate, albumController.getCreatorAlbums)
router.get(
  '/creator/:creatorId',
  authenticate,
  validate(getAlbumsByCreatorId),
  albumController.getAlbumsByCreatorId
)
router.get('/:id', authenticate, validate(getAlbum), albumController.getAlbum)
router.post('/', authenticate, validate(addAlbumDto), albumController.addAlbum)
router.patch(
  '/:id',
  authenticate,
  validate(updateAlbumDto),
  albumController.updateAlbum
)
router.delete(
  '/:id',
  authenticate,
  validate(deleteAlbumDto),
  albumController.deleteAlbum
)

export default router
