import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Films, FilmsSchema } from './schemes/films.schema';
import { FilmsRepository } from '../repository/film.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
