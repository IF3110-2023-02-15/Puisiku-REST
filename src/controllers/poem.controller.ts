import { Request, Response } from 'express'

import PoemService from '../services/poem.service'
import PoemRepository from '../repositories/poem.repository'

class PoemController {
  private poemService: PoemService

  constructor() {
    this.poemService = new PoemService(new PoemRepository())
  }

  getAllPoems = async (req: Request, res: Response) => {
    try {
      const poems = await this.poemService.getAllPoems()
      res.json(poems)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  createPoem = async (req: Request, res: Response) => {
    try {
      const poems = await this.poemService.createPoem(req.body)
      res.json(poems)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  getPoemById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const poem = await this.poemService.getPoemById(id)
      res.json(poem)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  updatePoem = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const poems = await this.poemService.updatePoem(id, req.body)
      res.json(poems)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  deletePoem = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const poems = await this.poemService.deletePoem(id)
      console.log(poems);
      res.json(poems)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  getAlbumPoems = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    
    try {
      const poems = await this.poemService.getAlbumPoems(albumId)
      res.json(poems)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default PoemController
