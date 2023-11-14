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

  async updatePoem(id:number, data: IPoem) {
    return await this.poemRepository.updatePoem(data, id)
  }

  async deletePoem(id:number) {
    return await this.poemRepository.deletePoem(id)
  }

  async getPoemById(id: number) {
    return await this.poemRepository.getPoemById(id)
  }

  async getAlbumPoems(albumId: number) {
    return await this.poemRepository.getPoemsByAlbum(albumId)
  }

  async getAlbumIdByPoemId(id: number){
    return await this.poemRepository.getAlbumIdByPoemId(id)
  }
}

export default PoemService
