import { Request, Response } from 'express'

import AlbumService from '../services/album.service'
import AlbumRepository from '../repositories/album.repository'
import UserRepository from '../repositories/user.repository'
import { AlbumNotFoundError, CreatorNotFoundError } from '../errors/errors'
import UserService from '../services/user.service'

const DEFAULT_ALBUM_IMAGE_PATH = '/img/default_album.png'

class AlbumController {
  private albumService: AlbumService
  private userService: UserService

  constructor() {
    this.albumService = new AlbumService(
      new AlbumRepository(),
      new UserRepository()
    )
    this.userService = new UserService(new UserRepository())
  }

  addAlbum = async (req: Request, res: Response) => {
    const creatorId = Number(req.user && req.user.id)
    const { name } = req.body
    let imagePath = req.body.imagePath

    if (!imagePath) {
      imagePath = DEFAULT_ALBUM_IMAGE_PATH
    }

    try {
      const album = await this.albumService.addAlbum({
        name,
        creatorId,
        imagePath,
      })

      return res.json(album)
    } catch (error: any) {
      return res.status(400).json({ error: error.toString() })
    }
  }

  getAlbum = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const creatorId = Number(req.user && req.user.id)

    try {
      const album = await this.albumService.getAlbum(id)

      if (creatorId === album?.creatorId) {
        return res.json(album)
      }

      res.status(401).json({ error: 'Not Authorized' })
    } catch (error: any) {
      if (error instanceof AlbumNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.toString() })
    }
  }

  getCreatorAlbums = async (req: Request, res: Response) => {
    const creatorId = Number(req.user && req.user.id)

    try {
      const albums = await this.albumService.getAlbums({ creatorId })

      return res.json(albums)
    } catch (error: any) {
      return res.status(400).json({ error: error.toString() })
    }
  }

  getAlbumsByCreatorId = async (req: Request, res: Response) => {
    const creatorId = Number(req.params.creatorId)

    try {
      const albums = await this.albumService.getAlbums({ creatorId })
      const creator = await this.userService.getProfileById(creatorId)

      return res.json({ creator, albums })
    } catch (error: any) {
      if (error instanceof CreatorNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error })
    }
  }

  updateAlbum = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { name, imagePath } = req.body
    const data = { name, imagePath }

    try {
      const album = await this.albumService.updateAlbum({ id, data })

      return res.json(album)
    } catch (error: any) {
      return res.status(400).json({ error: error.toString() })
    }
  }

  deleteAlbum = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const album = await this.albumService.deleteAlbum({ id })

      return res.json(album)
    } catch (error: any) {
      return res.status(400).json({ error: error.toString() })
    }
  }
}

export default AlbumController
