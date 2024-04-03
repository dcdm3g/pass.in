import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:id',
    {
      schema: {
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z.object({
            event: z.object({
              title: z.string().min(4),
              details: z.string().nullish(),
              slug: z.string(),
              maximumAttendees: z.number().int().positive().nullish(),
              amountOfAttendees: z.number().int().nonnegative(),
            }),
          }),
          404: z.object({ message: z.literal('Event not found') }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const event = await prisma.event.findUnique({
        where: { id },
        select: {
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: { select: { attendees: true } },
        },
      })

      if (!event) {
        return reply.status(404).send({
          message: 'Event not found',
        })
      }

      return {
        event: {
          title: event.title,
          details: event.details,
          slug: event.slug,
          maximumAttendees: event.maximumAttendees,
          amountOfAttendees: event._count.attendees,
        },
      }
    },
  )
}
