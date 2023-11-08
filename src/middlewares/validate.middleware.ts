import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message:
            error.message ||
            'Request body validation failed! Please send appropriate request body!',
        })
      } else {
        res.status(500).send({
          message:
            'An unexpected error occurred in request validation! Please try again later!',
        })
      }
    }
  }
}
