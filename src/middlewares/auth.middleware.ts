import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

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
      return res.status(401).json({ message: 'Token invalid' })
    }

    if (typeof decoded === 'object') {
      req.user = decoded as JwtPayload
    }

    next()
  })
}

export const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        message: 'Forbidden: you do not have the required permissions',
      })
    }

    next()
  }
}
