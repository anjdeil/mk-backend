import { utilities } from 'nest-winston';
import { json } from 'sequelize';
import * as winston from 'winston';

const { combine, timestamp, label, align, ms, printf, colorize, errors } =
  winston.format;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const NewrelicWinston = require('newrelic-winston');

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('music-market-app', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(
        timestamp(),
        align(),
        printf(
          (info) =>
            `[${info.timestamp}] ${info.level.toUpperCase()} ${
              info.context
                ? info.context +
                  ' '.repeat(
                    15 - info.context.length > 0 ? 15 - info.context.length : 0,
                  )
                : ''
            } ${info.message} ${
              info.stack ? '\n[STACKTRACE] ' + info.stack : ''
            }`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(
        timestamp(),
        align(),
        printf(
          (info) =>
            `[${info.timestamp}] ${info.level.toUpperCase()} ${
              info.context
                ? info.context +
                  ' '.repeat(
                    15 - info.context.length > 0 ? 15 - info.context.length : 0,
                  )
                : ''
            } ${info.message} ${
              info.stack ? '\n[STACKTRACE] ' + info.stack : ''
            }`,
        ),
      ),
    }),
    new NewrelicWinston({ level: 'debug', format: winston.format.json() }),
  ],
});
