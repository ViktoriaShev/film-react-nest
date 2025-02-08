import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/error-header';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const logger =
    process.env.NODE_ENV === 'production' ? new JsonLogger() : new DevLogger();

  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(new TskvLogger());
  await app.listen(3000);
}
bootstrap();
