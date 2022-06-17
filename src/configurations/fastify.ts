import fastify from "fastify";
import swagger from "@fastify/swagger";
import { request } from "http";
import {
  GetSongsQueryString,
  GetSongsQueryStringSchema,
} from "schemas/get-songs";

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

app.get<{ Querystring: GetSongsQueryString }>("/songs", (req, resp) => {
  const { query } = req;
  app.log.debug({ query });
  resp.send(query);
});

app.ready(() => {
  app.swagger();
});

export default app;
