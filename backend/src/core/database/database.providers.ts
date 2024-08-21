import { Logger, LoggerService } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { format } from 'sql-formatter';

import databaseConfig from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';

const logger: LoggerService = new Logger('SEQUELIZE');

const sqlLoggerDebug = (...args) =>
  logger.debug(
    format(args[0] || '', { language: 'postgresql' }),
    `EXECUTION TIME: ${args?.[1]} ms`,
  );

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      try {
        let config;
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = databaseConfig.development;
            break;
          case TEST:
            config = databaseConfig.test;
            break;
          case PRODUCTION:
            config = databaseConfig.production;
            break;
          default:
            logger.debug('deafult: databaseConfig.development');
            config = databaseConfig.development;
        }
        const sequelize = new Sequelize({
          ...config,
          logging: process.env.DB_LOGGING === 'true' ? sqlLoggerDebug : false,
          benchmark: true,
        });
        try {
          await sequelize.authenticate();
          logger.debug('Connection has been established successfully.');
        } catch (err) {
          logger.error('Unable to connect to the database:', err);
          throw err;
        }

        sequelize.addModels([__dirname + '/../models/*.entity{.ts,.js}']);
        return sequelize;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
];
