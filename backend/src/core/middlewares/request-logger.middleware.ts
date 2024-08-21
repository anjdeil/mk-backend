import {
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: LoggerService = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const message = `[${statusCode}]${'\t'.repeat(2)}${method}${'\t'.repeat(
        2,
      )}${originalUrl}`;
      this.handleStatusCode(statusCode, message);
    });

    next();
  }

  handleStatusCode(statusCode: number, message: string) {
    if (statusCode < 400) {
      this.logger.log(message);
    } else if (statusCode >= 400 && statusCode < 500) {
      this.logger.warn(message);
    } else if (statusCode >= 500) {
      this.logger.error(message);
    } else {
      // Fallback for any other status codes
      this.logger.warn(
        `[Unhandled status code] -> [${statusCode}]: ${message}`,
      );
    }
  }
}
