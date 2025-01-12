import { Controller, Get, Param } from '@nestjs/common';

import { FilmsService } from './films.service';
import { FilmDto, WithTotal, ScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<{
    total: number;
    items: Omit<FilmDto, 'schedule'>[];
  }> {
    return await this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string): Promise<WithTotal<ScheduleDto>> {
    return await this.filmsService.getFilmById(id);
  }
}
