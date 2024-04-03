import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/utils/slugify'

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullish(),
          maximumAttendees: z.number().int().positive().nullish(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
          409: z.object({
            message: z.literal('Slug already in use'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body

      const slug = slugify(title)

      const eventWithSameSlug = await prisma.event.findUnique({
        where: { slug },
      })

      if (eventWithSameSlug) {
        return reply.status(409).send({
          message: 'Slug already in use',
        })
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
        select: {
          id: true,
        },
      })

      return reply.status(201).send({ eventId: event.id })
    },
  )
}
