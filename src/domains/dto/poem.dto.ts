import { z } from 'zod'

export const addPoemDto = z.object({
  title: z.string(),
  genre: z.string(),
  content: z.string(),
  creatorId: z.number(),
  imagePath: z.string(),
  audioPath: z.string(),
  year: z.number(),
})
