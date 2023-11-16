import Redis from 'ioredis'

class RedisDatabase {
  private client: Redis

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    })
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  }

  async get(key: string): Promise<string | null> {
    const value = await this.client.get(key)
    return value
  }

  async del(key: string): Promise<void> {
    await this.client.del(key)
  }
}

export default RedisDatabase
