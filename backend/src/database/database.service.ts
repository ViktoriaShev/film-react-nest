import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getDatabaseConfig } from './database.config'; // Импортируем конфигурацию

import { Films } from '../films/entities/films.entity';
import { Schedules } from '../films/entities/schedules.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  getPostgresConfig(): TypeOrmModuleOptions {
    const postgresConfig = getDatabaseConfig(this.configService);
    return {
      ...postgresConfig,
      entities: [Films, Schedules],
    };
  }
}
