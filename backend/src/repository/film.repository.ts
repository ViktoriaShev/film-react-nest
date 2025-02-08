import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Films } from '../films/entities/films.entity';
import { Schedules } from '../films/entities/schedules.entity';
import { FilmDto, WithTotal, ScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmRepository: Repository<Films>,
  ) {}

  async getAllFilms(): Promise<{
    total: number;
    items: Omit<FilmDto, 'schedule'>[];
  }> {
    const [films, total] = await this.filmRepository.findAndCount({
      select: [
        'id',
        'rating',
        'director',
        'tags',
        'title',
        'about',
        'description',
        'image',
        'cover',
      ],
    });
    const items = films.map((film) => ({
      id: film.id,
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
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    const schedule = film.schedule || [];

    return {
      total: schedule.length,
      items: schedule.map((session) => ({
        id: session.id,
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
    newTakenSeats: string,
  ): Promise<void> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    const schedule = film.schedule.find((session) => session.id === scheduleId);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    const existingTakenSeats = schedule.taken ? schedule.taken.split(',') : [];

    const updatedTakenSeats = [
      ...new Set([...existingTakenSeats, ...newTakenSeats.split(',')]),
    ];

    await this.filmRepository
      .createQueryBuilder()
      .update(Schedules)
      .set({ taken: updatedTakenSeats.join(',') })
      .where('id = :scheduleId', { scheduleId })
      .execute();
  }
}
