import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import rawBodyMiddleware from './core/middlewares/rawBody.middleware';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { WinstonLoggerService } from './shared/services';

async function bootstrap() {
  const logger = new WinstonLoggerService(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Music market API docs')
    .setDescription('List of endpoints for Music market API')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerEndpoint = 'docs';
  SwaggerModule.setup(swaggerEndpoint, app, document);

  app.use(rawBodyMiddleware());
  app.enableCors();
  app.useGlobalPipes(new ValidateInputPipe());

  const { PORT: port, HOST: host, NODE_ENV: env } = process.env;
  const protocol = env === 'development' ? 'https' : 'http';

  await app.listen(port, host).then(() => {
    logger.debug(`ENVIRONEMENT: ${env}`);
    logger.debug(`${protocol}://${host}:${port}/${swaggerEndpoint}`);
  });
}

bootstrap();
