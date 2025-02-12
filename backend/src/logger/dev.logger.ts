import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string, context?: string) {
    this.writeLog('log', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeLog('error', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.writeLog('warn', message, context);
  }

  debug(message: string, context?: string) {
    this.writeLog('debug', message, context);
  }

  verbose(message: string, context?: string) {
    this.writeLog('verbose', message, context);
  }

  private writeLog(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context || 'Application',
      trace: trace || undefined,
    };

    console.log(JSON.stringify(logEntry));
  }
}
