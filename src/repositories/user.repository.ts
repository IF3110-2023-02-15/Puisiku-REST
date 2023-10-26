import PSQL from '../databases/psql'
import { IUser } from '../domains/user.domain'

class UserRepository {
  async createUser(data: IUser) {
    return await PSQL.prisma.user.create({
      data,
    })
  }

  async getUserById(id: number) {
    return await PSQL.prisma.user.findUnique({
      where: { id },
    })
  }

  async getUserByEmail(email: string) {
    return await PSQL.prisma.user.findUnique({
      where: { email },
    })
  }

  async getAllUsers() {
    return await PSQL.prisma.user.findMany()
  }

  async updateUser(id: number, data: IUser) {
    return await PSQL.prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: number) {
    return await PSQL.prisma.user.delete({
      where: { id },
    })
  }
}

export default UserRepository
