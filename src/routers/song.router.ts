import { FastifyInstance } from 'fastify';
import { SongModel } from 'models/song';
import { GetSongsQueryString } from 'schemas/get-songs';

export const songRouter = (
  app: FastifyInstance,
  _: unknown,
  done: () => void,
) => {
  app.get<{ Querystring: GetSongsQueryString }>('/', (req, resp) => {
    const { query } = req;
    app.log.debug({ query });
    SongModel.find({})
      .exec()
      .then((docs) => {
        resp.send(docs.map((doc) => doc.toObject()));
      })
      .catch((error) => {
        app.log.error(error);
        resp.code(500).send({
          message: 'internal server error',
        });
      });
  });

  done();
};
