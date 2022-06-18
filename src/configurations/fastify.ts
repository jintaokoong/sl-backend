import swagger from "@fastify/swagger";
import fastify from "fastify";
import { songRouter } from "routers/song.router";

const app = fastify({
  logger: {
    level: "debug",
  },
});

app.register(swagger, {
  routePrefix: "docs",
  openapi: {
    info: {
      title: "Song List API",
      version: "1.0.0",
      description: "Song List API Backend",
    },
  },
  exposeRoute: true,
});

app.get("/", (_, resp) => {
  resp.send({ message: "service is up!" });
});

app.register(songRouter, { prefix: '/api/songs' });

app.ready(() => {
  app.swagger();
});

export default app;
