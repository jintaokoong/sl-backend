import fastify from "fastify";
import { request } from "http";
import { GetSongsQueryString } from "schemas/get-songs";

const app = fastify({
  logger: {
    level: "debug",
  },
});

app.get("/", (_, resp) => {
  resp.send({ message: "service is up!" });
});

app.get<{ Querystring: GetSongsQueryString }>("/songs", (req, resp) => {
  const { query } = req;
  app.log.debug({ query });
  resp.send(query);
});

export default app;
