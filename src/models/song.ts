import { getModelForClass, prop, index } from '@typegoose/typegoose'

@index({name: 'text', artist: 'text'})
export class Song {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  artist: string;
  @prop({ required: true })
  genres: string[];
}

export const SongModel = getModelForClass(Song);
