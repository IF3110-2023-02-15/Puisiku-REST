import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserRepository from '../repositories/user.repository'
import {
  EmailExistsError,
  EnvVarsError,
  UserNotFoundError,
  IncorrectPasswordError,
  ConfirmationPasswordNotMatched,
} from '../errors/errors'

interface IRegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(data: IRegisterData) {
    if (data.password !== data.confirmPassword) {
      throw new ConfirmationPasswordNotMatched()
    }

    const existingUser = await this.userRepository.getUserByEmail(data.email)
    if (existingUser) {
      throw new EmailExistsError()
    }

    const { name, email, password } = data
    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.userRepository.createUser({ name, email, hashedPassword })
  }

  async login(email: string, password: string) {
    const secret_key = process.env.JWT_SECRET_KEY
    const expire_time = process.env.JWT_EXPIRE_TIME

    if (!secret_key || !expire_time) {
      throw new EnvVarsError()
    }

    const user = await this.userRepository.getUserByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }

    const passwordMatches = await bcrypt.compare(password, user.hashedPassword)
    if (!passwordMatches) {
      throw new IncorrectPasswordError()
    }

    const token = jwt.sign(
      { id: user.id, imagePath: user.imagePath },
      secret_key,
      {
        expiresIn: expire_time,
      }
    )
    return { success: true, token }
  }
}

export default AuthService
