import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/film.repository';
import { FilmDto, WithTotal, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  getAllFilms(): Promise<{
    total: number;
    items: Omit<FilmDto, 'schedule'>[];
  }> {
    return this.filmsRepository.findAll();
  }

  getFilmById(id: string): Promise<WithTotal<ScheduleDto>> {
    return this.filmsRepository.findById(id);
  }

  async updateFilmSchedule(
    filmId: string,
    scheduleId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.filmsRepository.updateTakenSeats(filmId, scheduleId, takenSeats);
  }
}
