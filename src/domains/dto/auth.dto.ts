import { z } from 'zod'

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RegisterDto = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})
