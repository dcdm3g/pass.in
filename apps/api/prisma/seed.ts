import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed() {
  await prisma.event.create({
    data: {
      id: '12345678-1234-1234-1234-123456789abc',
      title: 'Amazing Event',
      slug: 'amazing-event',
      attendees: {
        createMany: {
          data: Array.from({ length: 115 }).map((_, i) => ({
            id: 1500 + i,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            checkedInAt: faker.helpers.maybe(
              () => faker.date.recent({ days: 15 }),
              { probability: 0.75 },
            ),
          })),
        },
      },
    },
  })
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
