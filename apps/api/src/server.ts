import fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(swagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Pass.in API',
      description: 'Pass.in application API.',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(swaggerUI, { routePrefix: '/docs' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then((address) => {
    console.log(`HTTP Server Running on ${address}`)
  })
