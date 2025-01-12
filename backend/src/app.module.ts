import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { ConfigProviderModule } from './config.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

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
    FilmsModule,
    OrderModule,
    MongooseModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['CONFIG'],
      useFactory: (config: { database: { url: string } }) => ({
        uri: config.database.url,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
