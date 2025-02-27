import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfigService } from './mongo-config.service';
import { PostgresConfigService } from './postgres-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  providers: [MongoConfigService, PostgresConfigService],
  exports: [MongoConfigService, PostgresConfigService],
})
export class DatabaseModule {}
