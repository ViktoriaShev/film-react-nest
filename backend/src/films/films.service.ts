import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/film.repository';
import { FilmDetailsDto, WithTotal, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  getAllFilms(): Promise<{
    total: number;
    items: Omit<FilmDetailsDto, 'schedule'>[];
  }> {
    return this.filmsRepository.findAll();
  }

  getFilmById(id: string): Promise<WithTotal<ScheduleDto>> {
    return this.filmsRepository.findById(id);
  }
}
