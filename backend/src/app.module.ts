import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { ConfigProviderModule } from './config.module';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/film.repository';
import { FilmDetails, FilmDetailsSchema } from './films/schemes/films.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    ConfigProviderModule,
    MongooseModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['CONFIG'],
      useFactory: (config: { database: { url: string } }) => ({
        uri: config.database.url,
      }),
    }),
    MongooseModule.forFeature([
      { name: FilmDetails.name, schema: FilmDetailsSchema },
    ]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService, FilmsRepository],
})
export class AppModule {}
