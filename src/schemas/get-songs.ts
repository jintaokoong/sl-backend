import { Static, Type } from "@sinclair/typebox";

const OptionalNumber = () => Type.Optional(Type.Number());

const GetSongsQueryStringSchema = Type.Object({
  page: OptionalNumber(),
  pageSize: OptionalNumber(),
  query: Type.Optional(Type.String()),
});

type GetSongsQueryString = Static<typeof GetSongsQueryStringSchema>;

export { GetSongsQueryString, GetSongsQueryStringSchema };
