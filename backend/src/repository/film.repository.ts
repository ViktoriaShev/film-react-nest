import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Films } from '../films/schemes/films.schema';
import { FilmDto, ScheduleDto, WithTotal } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Films.name) private filmModel: Model<Films>) {}

  async findAll(): Promise<{
    total: number;
    items: Omit<FilmDto, 'schedule'>[];
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

    const schedule = film.schedule || [];

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

  async updateTakenSeats(
    filmId: string,
    scheduleId: string,
    newTakenSeats: string[],
  ): Promise<void> {
    const film = await this.filmModel.findById(filmId).exec();
    if (!film) {
      throw new Error('Film not found');
    }

    const schedule = film.schedule.find((session) => session.id === scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    const existingTakenSeats = schedule.taken || [];

    const updatedTakenSeats = [
      ...new Set([...existingTakenSeats, ...newTakenSeats]),
    ];

    await this.filmModel
      .updateOne(
        { _id: filmId, 'schedule.id': scheduleId },
        { $set: { 'schedule.$.taken': updatedTakenSeats } },
      )
      .exec();
  }
}
