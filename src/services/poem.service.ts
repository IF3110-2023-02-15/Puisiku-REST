import PoemRepository from '../repositories/poem.repository'
import { IPoem } from '../domains/poem.domain'

class PoemService {
  constructor(private poemRepository: PoemRepository) {}

  async getAllPoems() {
    return await this.poemRepository.getAllPoems()
  }

  async createPoem(data: IPoem) {
    return await this.poemRepository.createPoem(data)
  }

  async getPoemById(id: number) {
    return await this.poemRepository.getPoemById(id)
  }

  async getAlbumPoems(albumId: number) {
    return await this.poemRepository.getPoemsByAlbum(albumId)
  }
}

export default PoemService
