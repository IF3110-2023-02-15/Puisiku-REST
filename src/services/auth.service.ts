import UserRepository from '../repositories/user.repository'
import { IUser } from '../domains/user.domain'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(data: IUser) {
    const hashedPassword = await bcrypt.hash(data.hashedPassword, 10)
    return await this.userRepository.createUser({ ...data, hashedPassword })
  }

  async login(email: string, password: string) {
    const secret_key = process.env.JWT_SECRET_KEY
    const expire_time = process.env.JWT_EXPIRE_TIME

    if (!secret_key || !expire_time) {
      throw new Error(
        'JWT_SECRET_KEY or JWT_EXPIRE_TIME is not set in the environment variables'
      )
    }

    const user = await this.userRepository.getUserByEmail(email)
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const token = jwt.sign({ id: user.id, role: user.role }, secret_key, {
        expiresIn: expire_time,
      })
      return { success: true, token }
    }
    return { success: false }
  }
}

export default AuthService
