import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './config.service';
import { validate } from './env.validation';
@Global()
@Module({
  exports: [ApiConfigService],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validate: validate,
      validationOptions: {
        allowUnknown: false,
      },
    }),
  ],
  providers: [ApiConfigService],
})
export class ApiConfigModule {}
