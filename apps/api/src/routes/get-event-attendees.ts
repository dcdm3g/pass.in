import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getEventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:id/attendees',
    {
      schema: {
        summary: 'Get an event attendees',
        tags: ['events'],
        params: z.object({ id: z.string().uuid() }),
        querystring: z.object({
          page: z
            .string()
            .default('1')
            .pipe(z.coerce.number().int().positive()),
          search: z.string().optional(),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number().int().positive(),
                name: z.string().min(4),
                email: z.string().email(),
                registeredAt: z.date(),
                checkedInAt: z.date().nullable(),
              }),
            ),
          }),
          404: z.object({ message: z.literal('Event not found') }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { page, search } = request.query

      const event = await prisma.event.findUnique({
        where: { id },
        select: {
          attendees: {
            where: search
              ? {
                  name: {
                    contains: search,
                  },
                }
              : undefined,
            select: {
              id: true,
              name: true,
              email: true,
              registeredAt: true,
              checkedInAt: true,
            },
            take: 10,
            skip: 10 * (page - 1),
          },
        },
      })

      if (!event) {
        return reply.status(404).send({ message: 'Event not found' })
      }

      return { attendees: event.attendees }
    },
  )
}
