import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/error-header';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
