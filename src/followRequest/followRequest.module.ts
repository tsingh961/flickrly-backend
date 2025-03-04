import { Module } from '@nestjs/common';
import { FollowRequestController } from './followRequest.controller';
import { FollowRequestService } from './followRequest.service';
import { FollowersModule } from '@follower/followers.module';

@Module({
  imports: [FollowersModule],
  controllers: [FollowRequestController],
  providers: [FollowRequestService],
})
export class FriendRequestModule {}
