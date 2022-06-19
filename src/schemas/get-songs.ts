import { Static, Type } from '@sinclair/typebox';

const GetSongsQueryStringSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  pageSize: Type.Optional(Type.Number( { minimum: 0 } )),
  search: Type.Optional(Type.String()),
});

type GetSongsQueryString = Static<typeof GetSongsQueryStringSchema>;

export { GetSongsQueryString, GetSongsQueryStringSchema };
