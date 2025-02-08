import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbType = configService.get<string>('DATABASE_DRIVER', 'postgres');

  if (dbType === 'postgres') {
    return {
      type: dbType,
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT', 5432),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      synchronize: false,
    };
  }
  if (dbType === 'mongodb') {
    return {
      driver: dbType,
      url: configService.get<string>(
        'DATABASE_URL',
        'mongodb://localhost:27017/afisha',
      ),
    };
  }
  throw new Error(`Unsupported database type: ${dbType}`);
};
