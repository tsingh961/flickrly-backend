import { forwardRef, Module } from '@nestjs/common';
import { FollowRequestController } from './followRequest.controller';
import { FollowRequestService } from './followRequest.service';
import { FollowersModule } from '@follower/followers.module';

@Module({
  imports: [forwardRef(() => FollowersModule)],
  controllers: [FollowRequestController],
  providers: [FollowRequestService],
  exports: [FollowRequestService],
})
export class FollowRequestModule {}
