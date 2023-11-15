import AlbumRepository from '../repositories/album.repository'
import UserRepository from '../repositories/user.repository'
import RedisDatabase from '../databases/redis'
import { CreatorNotFoundError, AlbumNotFoundError } from '../errors/errors'

interface IAddAlbum {
  name: string
  imagePath: string
  creatorId: number
}

interface IGetAlbums {
  creatorId: number
}

interface IUpdateAlbum {
  id: number
  data: {
    name?: string
    imagePath?: string
  }
}

interface IDeleteAlbum {
  id: number
}

class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private userRepository: UserRepository,
    private redisDatabase: RedisDatabase
  ) {}

  async addAlbum(data: IAddAlbum) {
    const album = await this.albumRepository.createAlbum(data)
    await this.redisDatabase.del(`album:${album.id}`)
    return album
  }

  async getAlbum(id: number) {
    const cacheAlbum = await this.redisDatabase.get(`album:${id}`)

    if (cacheAlbum) {
      return JSON.parse(cacheAlbum)
    }

    const album = await this.albumRepository.getAlbum(id)
    if (album) {
      await this.redisDatabase.set(`album:${id}`, JSON.stringify(album))
    }

    return album
  }

  async getAlbums(data: IGetAlbums) {
    const creator = await this.userRepository.getUserById(data.creatorId)
    if (!creator) {
      return new CreatorNotFoundError()
    }
    return await this.albumRepository.getCreatorAlbums(data.creatorId)
  }

  async updateAlbum(data: IUpdateAlbum) {
    const album = await this.albumRepository.updateAlbum(data.id, data.data)
    if (album) {
      await this.redisDatabase.del(`album:${data.id}`)
    }
    return album
  }

  async deleteAlbum(data: IDeleteAlbum) {
    await this.albumRepository.deleteAlbum(data.id)
    await this.redisDatabase.del(`album:${data.id}`)
  }
}

export default AlbumService
