import fastify from 'fastify';
import { songRouter } from 'routers/song.router';
import fastifyCors from '@fastify/cors'

const app = fastify({
  logger: {
    level: 'debug',
  },
  ajv: {
    customOptions: {
      keywords: ['kind', 'modifier'],
    },
  },
});

app.register(fastifyCors, {
  origin: '*',
});

app.get('/', (_, resp) => {
  resp.send({ message: 'service is up!' });
});

app.register(songRouter, { prefix: '/api/songs' });

export default app;
