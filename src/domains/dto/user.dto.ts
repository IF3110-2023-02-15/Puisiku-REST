import { z } from 'zod'

export const updateProfileDto = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imagePath: z.string().optional(),
})
