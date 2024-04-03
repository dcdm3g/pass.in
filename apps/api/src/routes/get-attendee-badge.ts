import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:id/badge',
    {
      schema: {
        summary: 'Get an attendee badge',
        tags: ['attendees'],
        params: z.object({ id: z.coerce.number().int().positive() }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string().min(4),
              email: z.string().email(),
              eventTitle: z.string().min(4),
              checkInURL: z.string().url(),
            }),
          }),
          404: z.object({ message: z.literal('Attendee not found') }),
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

      const baseURL = `${request.protocol}://${request.hostname}`
      const checkInURL = new URL(`attendees/${id}/check-in`, baseURL)

      return {
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString(),
        },
      }
    },
  )
}
