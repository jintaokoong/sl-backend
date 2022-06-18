import { getOr } from "configurations/envvar";
import app from "configurations/fastify";
import "configurations/firebase";
import mongoose from "mongoose";

const connectDatabase = () => mongoose.connect(getOr('MONGO_URL', ''), {
  dbName: getOr('MONGO_DATABASE', 'sldb'),
  user: getOr('MONGO_USER', ''),
  pass: getOr('MONGO_PASS', ''),
})

const startFastify = () => app
.listen({
  port: getOr("PORT", 41867),
});

const main = () => {
  connectDatabase().then(() => {
    app.log.debug('connected to mongodb');
    return startFastify().then((value) => {
      app.log.debug(value);
    })
  }).catch(error => {
    app.log.error(error);
  })
};

main();
