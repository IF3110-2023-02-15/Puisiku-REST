import PSQL from '../databases/psql'
import { IAlbum } from '../domains/album.domain'
import { AlbumNotFoundError } from '../errors/errors'

class AlbumRepository {
  async createAlbum(data: IAlbum) {
    return await PSQL.prisma.album.create({
      data,
    })
  }

  async getAlbum(id: number) {
    const album = await PSQL.prisma.album.findFirst({
      where: { id },
    })

    if (!album) {
      throw new AlbumNotFoundError()
    }

    return album
  }

  async getCreatorAlbums(creatorId: number) {
    return await PSQL.prisma.album.findMany({
      where: { creatorId },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async updateAlbum(
    id: number,
    data: {
      name?: string
      imagePath?: string
    }
  ) {
    return await PSQL.prisma.album.update({
      where: { id },
      data,
    })
  }

  async deleteAlbum(id: number) {
    return await PSQL.prisma.album.delete({
      where: { id },
    })
  }
}

export default AlbumRepository
