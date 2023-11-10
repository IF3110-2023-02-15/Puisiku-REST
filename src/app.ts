import express from 'express'
import cors from 'cors'
import path from 'path'

import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'
import fileRoutes from './routes/file.route'
import poemRoutes from './routes/poem.route'

class App {
  public app: express.Application
  public port: string | number

  constructor(port: string | number) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(cors({ origin: process.env.CLIENT_SPA_BASE_URL }))
    this.app.use(express.static(path.join(__dirname, '../public')))
  }

  private initializeRoutes() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Hello, World!')
    })

    this.app.use('/auth', authRoutes)
    this.app.use('/user', userRoutes)
    this.app.use('/file', fileRoutes)
    this.app.use('/poem', poemRoutes)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`REST Server is running on port ${this.port}`)
    })
  }
}

export default App
