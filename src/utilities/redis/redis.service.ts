import { Injectable, Inject } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly _redisClient: Redis.Redis,
  ) {}
  redisClient = this._redisClient;
  async set(key: string, value: any): Promise<void> {
    await this._redisClient.set(key, JSON.stringify(value));
  }

  async setWithTTL(
    key: string,
    value: any,
    mode?: 'EX',
    ttl?: number,
  ): Promise<void> {
    if (mode && ttl) {
      await this._redisClient.set(key, JSON.stringify(value), mode, ttl);
    } else {
      await this._redisClient.set(key, JSON.stringify(value));
    }
  }

  async get(key): Promise<any> {
    const result = await this._redisClient.get(key);

    return result ? JSON.parse(result) : null;
  }

  async del(key: string): Promise<void> {
    await this._redisClient.del(key);
  }
  //  method for multi operations
  multi(): Redis.ChainableCommander {
    return this._redisClient.multi();
  }

  // New method for executing a pipeline of commands
  async execMulti(
    multi: Redis.ChainableCommander,
  ): Promise<[error: Error | null, result: unknown][] | null> {
    return multi.exec();
  }
}
