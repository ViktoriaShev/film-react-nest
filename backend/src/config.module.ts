import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';

@Module({
  imports: [ConfigModule],
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigProviderModule {}
