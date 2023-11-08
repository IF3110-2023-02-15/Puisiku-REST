import { Request, Response } from 'express'

import PoemService from '../services/poem.service'
import PoemRepository from '../repositories/poem.repository'

class PoemController {
    private poemService: PoemService
    
    constructor(){
        (this.poemService = new PoemService(new PoemRepository()));
    }

    getAllPoems = async (req: Request, res: Response) => {
        try {
            const poems = await this.poemService.getAllPoems();
            res.json(poems);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    createPoem = async (req: Request, res: Response) => {
        try {
            const poems = await this.poemService.createPoem(req.body);
            console.log(poems, "ini di service")
            res.json(poems);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    getPoemById = async (req: Request, res: Response) => {
        try {
            const poem = await this.poemService.getPoemById(req.body);
            res.json(poem);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

export default PoemController