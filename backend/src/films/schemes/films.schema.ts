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

  // Массив строк "row-seat" для отслеживания занятых мест
  @Prop({ type: [String], default: [] })
  taken: string[]; // Массив строк в формате "row-seat" (например "2-5" для ряда 2, места 5)
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export type FilmsDocument = Films & Document;

@Schema()
export class Films {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, nullable: false })
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

export const FilmsSchema = SchemaFactory.createForClass(Films);
