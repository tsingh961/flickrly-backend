import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiConfigModule } from '@core/config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from '@core/guards/rate-limit.guard';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule } from '@utilities/redis/redis.module';
import { DatabaseModule } from '@core/database/database.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { WinstonLogModule } from '@core/config/winston/winston.module';
import { AtGuard } from '@auth/common/gaurds/at.gaurd';
import { FriendRequestModule } from '@followRequest/followRequest.module';
import { FollowersModule } from '@follower/followers.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'private'),
        serveRoot: '/private',
      },
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/public',
      },
    ),
    ApiConfigModule,
    RedisModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    WinstonLogModule,
    FriendRequestModule,
    FollowersModule
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
