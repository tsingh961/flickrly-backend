import { forwardRef, Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { FollowRequestModule } from '@followRequest/followRequest.module';

@Module({
  imports: [forwardRef(() => FollowRequestModule)],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService],
})
export class FollowersModule {}
