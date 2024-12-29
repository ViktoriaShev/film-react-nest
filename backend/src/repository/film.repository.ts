import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilmDetails } from '../films/schemes/films.schema';
import { FilmDetailsDto, ScheduleDto, WithTotal } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(FilmDetails.name) private filmModel: Model<FilmDetails>,
  ) {}

  async findAll(): Promise<{
    total: number;
    items: Omit<FilmDetailsDto, 'schedule'>[];
  }> {
    const films = await this.filmModel.find({}).exec();
    const total = films.length;
    const items = films.map((film) => ({
      id: film._id.toString(),
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));
    return { total, items };
  }

  async findById(id: string): Promise<WithTotal<ScheduleDto>> {
    const film = await this.filmModel.findById(id).exec();
    if (!film) {
      return null;
    }

    // Предполагаем, что расписание хранится в виде массива объектов внутри модели фильма
    const schedule = film.schedule || []; // Замените film.schedule на фактическое поле с расписанием

    return {
      total: schedule.length,
      items: schedule.map((session) => ({
        id: session.id.toString(),
        daytime: session.daytime,
        hall: session.hall,
        rows: session.rows,
        seats: session.seats,
        price: session.price,
        taken: session.taken,
      })),
    };
  }
}
