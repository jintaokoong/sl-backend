import { Static, Type } from '@sinclair/typebox';

const InsertSongSchema = Type.Object({
  name: Type.String(),
  artist: Type.String(),
  genres: Type.Optional(Type.Array(Type.String())),
});

type InsertSong = Static<typeof InsertSongSchema>;

export { InsertSong, InsertSongSchema };
