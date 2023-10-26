import { PrismaClient } from '@prisma/client'

class PSQL {
  public prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }
}

export default new PSQL()
