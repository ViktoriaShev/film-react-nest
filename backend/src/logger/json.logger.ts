import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    trace?: string,
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context || 'Application',
      trace: trace || undefined,
    });
  }

  log(message: any, context?: string) {
    console.log(this.formatMessage('log', message, context));
  }

  error(message: any, trace?: string, context?: string) {
    console.error(this.formatMessage('error', message, context, trace));
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug?(message: any, context?: string) {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose?(message: any, context?: string) {
    console.info(this.formatMessage('verbose', message, context));
  }
}
