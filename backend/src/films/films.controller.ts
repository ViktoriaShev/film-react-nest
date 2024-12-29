import { Controller, Get, Param } from '@nestjs/common';

import { FilmsService } from './films.service';
import { FilmDetailsDto, WithTotal, ScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms(): Promise<{
    total: number;
    items: Omit<FilmDetailsDto, 'schedule'>[];
  }> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getFilmById(@Param('id') id: string): Promise<WithTotal<ScheduleDto>> {
    return this.filmsService.getFilmById(id);
  }
}
