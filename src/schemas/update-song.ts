import { Static, Type } from '@sinclair/typebox';

const UpdateSongQueryParamSchema = Type.Object({
  id: Type.String(),
});

type UpdateSongQueryParam = Static<typeof UpdateSongQueryParamSchema>;

const UpdateSongSchema = Type.Object({
  name: Type.String(),
  artist: Type.String(),
  genres: Type.Optional(Type.Array(Type.String())),
});

type UpdateSong = Static<typeof UpdateSongSchema>;

export {
  UpdateSong,
  UpdateSongSchema,
  UpdateSongQueryParamSchema,
  UpdateSongQueryParam,
};
