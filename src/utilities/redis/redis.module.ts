import { Module, Global, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = new Redis();
        const logger = new Logger('RedisModule');

        try {
          // Check the connection by sending a ping command
          await client.ping();
          logger.log('Redis connection established successfully.');
        } catch (error) {
          logger.error('Failed to connect to Redis:', error.message);
        }

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
