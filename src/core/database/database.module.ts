import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfigService } from './mongo-config.service';
import { PostgresClientService } from './postgresClientService .service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  providers: [MongoConfigService, PostgresClientService],
  exports: [MongoConfigService, PostgresClientService],
})
export class DatabaseModule {}
