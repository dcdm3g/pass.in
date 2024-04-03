import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/attendees/:id/check-in',
    {
      schema: {
        params: z.object({ id: z.coerce.number().int().positive() }),
        response: {
          204: z.null(),
          404: z.object({ message: z.literal('Attendee not found') }),
          403: z.object({ message: z.literal('Attendee already checked in') }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const attendee = await prisma.attendee.findUnique({
        where: { id },
        select: { checkedInAt: true },
      })

      if (!attendee) {
        return reply.status(404).send({ message: 'Attendee not found' })
      }

      if (attendee.checkedInAt) {
        return reply
          .status(403)
          .send({ message: 'Attendee already checked in' })
      }

      await prisma.attendee.update({
        where: { id },
        data: { checkedInAt: new Date() },
      })

      return reply.status(204).send()
    },
  )
}
