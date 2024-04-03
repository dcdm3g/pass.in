import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        params: z.object({ eventId: z.string().uuid() }),
        body: z.object({ name: z.string().min(4), email: z.string().email() }),
        response: {
          201: z.object({ attendeeId: z.number().int().positive() }),
          404: z.object({ message: z.literal('Event not found') }),
          403: z.object({ message: z.literal('Vacancies sold out') }),
          409: z.object({ message: z.literal('Email already in use') }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params
      const { name, email } = request.body

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { maximumAttendees: true },
      })

      if (!event) {
        return reply.status(404).send({ message: 'Event not found' })
      }

      const amountOfAttendees = await prisma.attendee.count({
        where: { eventId },
      })

      if (
        event.maximumAttendees &&
        amountOfAttendees >= event.maximumAttendees
      ) {
        return reply.status(403).send({
          message: 'Vacancies sold out',
        })
      }

      const attendeeWithSameEmail = await prisma.attendee.findUnique({
        where: { eventId_email: { eventId, email } },
      })

      if (attendeeWithSameEmail) {
        return reply.status(409).send({ message: 'Email already in use' })
      }

      const attendee = await prisma.attendee.create({
        data: { eventId, name, email },
        select: { id: true },
      })

      return { attendeeId: attendee.id }
    },
  )
}
