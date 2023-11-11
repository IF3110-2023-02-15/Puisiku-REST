import AlbumRepository from '../repositories/album.repository'
import UserRepository from '../repositories/user.repository'
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
    private userRepository: UserRepository
  ) {}

  async addAlbum(data: IAddAlbum) {
    return await this.albumRepository.createAlbum(data)
  }

  async getAlbum(id: number) {
    return await this.albumRepository.getAlbum(id)
  }

  async getAlbums(data: IGetAlbums) {
    const creator = await this.userRepository.getUserById(data.creatorId)

    if (!creator) {
      return new CreatorNotFoundError()
    }

    return await this.albumRepository.getCreatorAlbums(data.creatorId)
  }

  async updateAlbum(data: IUpdateAlbum) {
    const album = await this.albumRepository.getAlbum(data.id)

    if (!album) {
      return new AlbumNotFoundError()
    }

    return await this.albumRepository.updateAlbum(data.id, data.data)
  }

  async deleteAlbum(data: IDeleteAlbum) {
    const album = await this.albumRepository.getAlbum(data.id)

    if (!album) {
      return new AlbumNotFoundError()
    }

    return await this.albumRepository.deleteAlbum(data.id)
  }
}

export default AlbumService
