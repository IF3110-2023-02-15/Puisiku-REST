import { Request, Response } from 'express'

import AuthService from '../services/auth.service'
import UserRepository from '../repositories/user.repository'
import {
  EmailExistsError,
  EnvVarsError,
  UserNotFoundError,
  IncorrectPasswordError,
} from '../errors/errors'

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService(new UserRepository())
  }

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body)
      res.json(result)
    } catch (error: any) {
      if (error instanceof EmailExistsError) {
        res.status(409).json({ error: error.message })
      } else {
        res.status(400).json({ error: error.toString() })
      }
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const result = await this.authService.login(email, password)
      res.json(result)
    } catch (error: any) {
      if (
        error instanceof EnvVarsError ||
        error instanceof UserNotFoundError ||
        error instanceof IncorrectPasswordError
      ) {
        res.status(401).json({ error: error.message })
      } else {
        res.status(400).json({ error: error.toString() })
      }
    }
  }
}

export default AuthController
