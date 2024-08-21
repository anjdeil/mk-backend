import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

import { logger } from './winston-logger';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly context: string;

  constructor(context?: string) {
    this.context = context;
    this.logger = logger;
  }

  log(message: string) {
    this.logger.info(message, { context: this.context });
  }

  warn(message: string) {
    this.logger.warn(message, { context: this.context });
  }

  debug(message: string) {
    this.logger.debug(message, { context: this.context });
  }

  error(message: string, trace: string) {
    this.logger.error(message, { context: this.context, trace });
  }
}
