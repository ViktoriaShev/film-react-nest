import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [Number], default: [] })
  taken: number[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export type FilmDetailsDocument = FilmDetails & Document;

@Schema()
export class FilmDetails {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [ScheduleSchema], default: [] })
  schedule: Schedule[];
}

export const FilmDetailsSchema = SchemaFactory.createForClass(FilmDetails);
