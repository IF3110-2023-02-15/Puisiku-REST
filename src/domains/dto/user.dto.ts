import { z } from 'zod'

export const updateProfileDto = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    imagePath: z.string().optional(),
  }),
})

export const getCreatorByIdDto = z.object({
  params: z.object({
    creatorId: z.string().refine((creatorId) => !isNaN(Number(creatorId)), {
      message: 'Creator id is not a number',
    }),
  }),
})
