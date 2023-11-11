import { z } from 'zod'

export const addAlbumDto = z.object({
  body: z.object({
    name: z.string(),
    imagePath: z.string().optional(),
  }),
})

export const getAlbum = z.object({
  params: z.object({
    id: z.string().refine((id) => !isNaN(Number(id)), {
      message: 'Album id is not a number',
    }),
  }),
})

export const getAlbumsByCreatorId = z.object({
  params: z.object({
    creatorId: z.string().refine((creatorId) => !isNaN(Number(creatorId)), {
      message: 'Creator id is not a number',
    }),
  }),
})

export const updateAlbumDto = z.object({
  params: z.object({
    id: z.string().refine((id) => !isNaN(Number(id)), {
      message: 'Album id is not a number',
    }),
  }),
  body: z.object({
    name: z.string().optional(),
    imagePath: z.string().optional(),
  }),
})

export const deleteAlbumDto = z.object({
  params: z.object({
    id: z.string().refine((id) => !isNaN(Number(id)), {
      message: 'Album id is not a number',
    }),
  }),
})
