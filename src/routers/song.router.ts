import { FastifyInstance } from 'fastify';
import { SongModel } from 'models/song';
import {
  GetSongsQueryString,
  GetSongsQueryStringSchema,
} from 'schemas/get-songs';
import { InsertSong, InsertSongSchema } from 'schemas/insert-song';

export const songRouter = (
  app: FastifyInstance,
  _: unknown,
  done: () => void,
) => {
  app.get<{ Querystring: GetSongsQueryString }>(
    '/',
    { schema: { querystring: GetSongsQueryStringSchema } },
    (req, resp) => {
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
    },
  );

  app.post<{ Body: InsertSong }>(
    '/',
    { schema: { body: InsertSongSchema } },
    (req, resp) => {
      const { body } = req;
      SongModel.create({
        name: body.name,
        artist: body.artist,
        genres: body.genres ?? [],
      })
        .then((doc) => {
          const song = doc.toObject();
          app.log.info(song);
          resp.send(song);
        })
        .catch((error) => {
          app.log.error(error);
          resp.send({ message: 'failed to create song' });
        });
    },
  );

  done();
};
