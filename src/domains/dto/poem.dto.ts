import { z } from 'zod'

export const addPoemDto = z.object({
  body: z.object({
    title: z.string(),
    genre: z.string(),
    content: z.string(),
    creatorId: z.number(),
    imagePath: z.string(),
    audioPath: z.string(),
    year: z.number(),
    albumId: z.number(),
  }),
})

export const getAlbumPoems = z.object({
  params: z.object({
    albumId: z.string().refine((albumId) => !isNaN(Number(albumId)), {
      message: 'Album id is not a number',
    }),
  }),
})
