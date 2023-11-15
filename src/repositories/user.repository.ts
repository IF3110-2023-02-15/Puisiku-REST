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
      select: {
        name: true,
        email: true,
        imagePath: true,
        description: true,
      },
    })
  }

  async getUserByEmail(email: string) {
    return await PSQL.prisma.user.findUnique({
      where: { email },
    })
  }

  async getAllUsers() {
    return await PSQL.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async updateUserProfile(
    id: number,
    data: { name?: string; description?: string; imagePath?: string }
  ) {
    return await PSQL.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imagePath: data.imagePath,
      },
      select: {
        name: true,
        email: true,
        imagePath: true,
        description: true,
      },
    })
  }

  async deleteUser(id: number) {
    return await PSQL.prisma.user.delete({
      where: { id },
    })
  }
}

export default UserRepository
