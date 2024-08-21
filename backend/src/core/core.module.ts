import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CommonFilterMiddleware, LoggerMiddleware } from './middlewares';
import CoreProviders from './providers';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...CoreProviders],
  exports: [...CoreProviders],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(CommonFilterMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
