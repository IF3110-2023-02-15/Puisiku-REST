import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const PHP_API_KEY = process.env.PHP_API_KEY

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers['x-access-token']

  if (accessToken) {
    if (accessToken === process.env.ACCESS_TOKEN) {
      return next()
    } else {
      return res.status(401).json({ message: 'Access token is not valid' })
    }
  }

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted' })
  }

  const secret_key = process.env.JWT_SECRET_KEY

  if (!secret_key) {
    return res.status(401).json({ error: 'JWT Secret Key not available' })
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' })
      } else {
        return res.status(401).json({ message: 'Token invalid' })
      }
    }

    if (typeof decoded === 'object') {
      req.user = decoded as JwtPayload
    }

    next()
  })
}
