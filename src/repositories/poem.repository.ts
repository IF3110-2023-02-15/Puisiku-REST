import PSQL from '../databases/psql'
import { IPoem } from '../domains/poem.domain'

class PoemRepository {
  async createPoem(data: IPoem) {
    return await PSQL.prisma.poem.create({
      data,
    })
  }

  async getPoemById(id: number) {
    return await PSQL.prisma.poem.findUnique({
      where: { id },
    })
  }

  async getPoemByCreator(creatorId: number) {
    return await PSQL.prisma.poem.findMany({
      where: { creatorId },
    })
  }

  async getAllPoems() {
    return await PSQL.prisma.poem.findMany()
  }

  async updatePoem(data: IPoem, id: number) {
    return await PSQL.prisma.poem.update({
      data,
      where: { id },
    })
  }

  async deletePoem(id: number) {
    return await PSQL.prisma.poem.delete({
      where: { id },
    })
  }

  async getPoemsByAlbum(albumId: number) {
    return await PSQL.prisma.poem.findMany({
      where: { albumId },
    })
  }
}

export default PoemRepository
