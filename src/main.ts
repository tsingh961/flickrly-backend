// import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ApiConfigService } from './core/config/config.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
declare const module: any;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const apiConfigService = app.get(ApiConfigService);

  // response interceptor
  // app.useGlobalInterceptors(new ResponseInterceptor(apiConfigService));
  app.use((req: express.Request, res: express.Response, next) => {
    req.app.set('trust proxy', 1);
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const origins = process.env.CORS_ORIGINS.toString();
  const whitelist = origins.split(',');

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        // Allow requests with no origin (like same-origin or non-browser clients)
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(corsOptions);
  // versioning
  app.setGlobalPrefix('api');

  // Hot module replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Initialize routes and error handling
  await app.init();
  // Start the server
  await app.listen(apiConfigService.environment.port);

  Logger.log('=================================', 'Bootstrap');
  Logger.log(
    `=========== ENV: ${apiConfigService.environment.nodeEnv} ==========`,
    'Bootstrap',
  );
  Logger.log(
    `🚀 App listening on the port ${apiConfigService.environment.port}`,
    'Bootstrap',
  );
  Logger.log('=================================', 'Bootstrap');
}

bootstrap();
