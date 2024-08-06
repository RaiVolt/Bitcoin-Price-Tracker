import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import packageJSON from '../package.json';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { CommonModule, LogInterceptor } from './common';
import { IoAdapter } from '@nestjs/platform-socket.io';

/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT = 4001;
const API_DEFAULT_PREFIX = '/api/v1/';

/**
 * The defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 *
 * @todo Change the constants below following your API requirements
 */
const SWAGGER_TITLE = 'Bitcoin Price Tracker API';
const SWAGGER_DESCRIPTION = 'API for tracking Bitcoin prices';
const SWAGGER_PREFIX = '/docs';
const SWAGGER_VERSION = packageJSON?.version || '1.0.0';
const SWAGGER_ENABLE = true;

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix(API_DEFAULT_PREFIX);

  if (
    !process.env.SWAGGER_ENABLE ||
    process.env.SWAGGER_ENABLE === '1' ||
    SWAGGER_ENABLE
  ) {
    createSwagger(app);
  }

  app.useWebSocketAdapter(new IoAdapter(app));

  const logInterceptor = app.select(CommonModule).get(LogInterceptor);
  app.useGlobalInterceptors(logInterceptor);
  app.enableCors({ origin: '*' });

  await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
}

/**
 * It is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo It is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch((err) => {
  console.error(err);

  const defaultExitCode = 1;
  process.exit(defaultExitCode);
});
