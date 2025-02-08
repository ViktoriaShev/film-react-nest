import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    trace?: string,
  ): string {
    const logData: Record<string, string> = {
      time: new Date().toISOString(),
      level,
      message: String(message),
      context: context || 'Application',
    };

    if (trace) {
      logData.trace = trace;
    }

    return Object.entries(logData)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
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
