import "configurations/firebase";
import app from "configurations/fastify";
import { getOr } from "configurations/envvar";

const main = () => {
  return app
    .listen({
      port: getOr("PORT", 41867),
    })
    .then((value) => {
      app.log.debug(value);
    })
    .catch((error) => {
      app.log.error(error);
    });
};

main();
