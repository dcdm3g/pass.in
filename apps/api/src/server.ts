import fastify from 'fastify'

const app = fastify()

app
  .listen({
    port: 3333,
  })
  .then((address) => {
    console.log(`HTTP Server Running on ${address}`)
  })
