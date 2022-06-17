import fastify from "fastify";

const app = fastify({
  logger: {
    level: "debug",
  },
});

app.get("/", (_, resp) => {
  resp.send({ message: "service is up!" });
});

export default app;
