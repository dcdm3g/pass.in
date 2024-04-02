import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:id/badge',
    {
      schema: {
        params: z.object({ id: z.coerce.number().int().positive() }),
        response: {
          200: z.object({
            attendee: z.object({
              name: z.string().min(4),
              email: z.string().email(),
              event: z.object({
                title: z.string().min(4),
              }),
            }),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const attendee = await prisma.attendee.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      })

      if (!attendee) {
        return reply.status(404).send({ message: 'Attendee not found' })
      }

      return { attendee }
    },
  )
}
