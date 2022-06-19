import { FastifyInstance } from 'fastify';
import { SongModel } from 'models/song';
import {
  GetSongsQueryString,
  GetSongsQueryStringSchema,
} from 'schemas/get-songs';
import { InsertSong, InsertSongSchema } from 'schemas/insert-song';
import {
  UpdateSong,
  UpdateSongQueryParam,
  UpdateSongQueryParamSchema,
  UpdateSongSchema,
} from 'schemas/update-song';
import auth from '../utils/auth'

export const songRouter = (
  app: FastifyInstance,
  _: unknown,
  done: () => void,
) => {
  app.get<{ Querystring: GetSongsQueryString }>(
    '/',
    { schema: { querystring: GetSongsQueryStringSchema } },
    (req, resp) => {
      const { query:  { page = 1, pageSize = 10, search } } = req;
      app.log.debug(req.query);
      const filter = search ? {$text: { $search: search } } : {};
      return SongModel.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec()
        .then((docs) => {
          return SongModel.count(filter).exec()
            .then((count) => {
            const returnObject = {
              page,
              pageSize,
              data: docs.map((doc) => doc.toObject()),
              total: count,
            };
            resp.send(returnObject);
            return resp;
          });
        })
        .catch((error) => {
          app.log.error(error);
          resp.code(500).send({
            message: 'internal server error',
          });
          return resp;
        });
    },
  );

  app.register(songsProtected);

  done();
};

const songsProtected = (app: FastifyInstance, _: unknown, done: () => void) => {
  app.addHook('onRequest', (req, resp, done) => {
    app.log.debug('onrequest');
    const {authorization} = req.headers;
    app.log.info('decode token');
    const decodeResult = auth.extractToken(authorization);
    if (decodeResult[0]) {
      resp.code(403);
      done(decodeResult[0]);
      return resp;
    }
    const token = decodeResult[1];
    app.log.info('validate token');
    return auth.validateToken(token).then(() => {
      done();
      return resp;
    }).catch(() => {
      resp.code(403);
      done(new Error('unauthorized'));
      return resp;
    });
  });

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

  app.put<{
    Body: UpdateSong;
    Params: UpdateSongQueryParam;
  }>(
    '/:id',
    { schema: { body: UpdateSongSchema, params: UpdateSongQueryParamSchema } },
    (req, resp) => {
      const { params, body } = req;
      return SongModel.findOneAndUpdate(
        { _id: params.id },
        {
          name: body.name,
          genres: body.genres ?? [],
          artist: body.artist,
        },
        {
          new: true,
        },
      ).then((doc) => {
        if (doc == null) {
          return resp.code(404).send({ message: 'song not found' });
        } else {
          return resp.send(doc.toObject());
        }
      });
    },
  );

  done();
};
