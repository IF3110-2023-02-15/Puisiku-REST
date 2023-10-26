import express from 'express'
import authRoutes from './routes/auth.route'

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
  }

  private initializeRoutes() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Hello, World!')
    })
    this.app.use('/auth', authRoutes)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`REST Server is running on port ${this.port}`)
    })
  }
}

export default App
