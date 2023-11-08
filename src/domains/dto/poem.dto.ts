import { z } from 'zod'

export const PoemDto = z.object({
  title: z.string(),
  genre: z.string(),
  content: z.string(),
  imagePath: z.string(),
  audioPath: z.string(),
  year: z.string(),
})

