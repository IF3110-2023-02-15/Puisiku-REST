import { Request, Response } from 'express'

class FileController {
  upload = (type: string) => (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file was uploaded.' })
      return
    }

    const filePath = `/${type}/` + req.file.filename

    res.json({ filePath: filePath })
  }

  uploadImage = this.upload('img')
  uploadAudio = this.upload('audio')
}

export default FileController
