import { Request, Response } from 'express'
import AuthService from '../services/auth.service'
import UserRepository from '../repositories/user.repository'

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService(new UserRepository())
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const result = await this.authService.login(email, password)
      res.json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.toString() })
    }
  }

  register = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const result = await this.authService.register(req.body)
      res.json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.toString() })
    }
  }
}

export default AuthController
