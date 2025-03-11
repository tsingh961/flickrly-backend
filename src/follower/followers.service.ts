import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { PostgresClientService } from '@core/database/postgresClientService .service';
import { FollowRequestService } from '@followRequest/followRequest.service';

@Injectable()
export class FollowersService {
  constructor(
    private prisma: PostgresClientService,
    @Inject(forwardRef(() => FollowRequestService))
    private readonly _followRequestService: FollowRequestService,
  ) {}

  async create(createFollowerDto: CreateFollowerDto) {
    return this.prisma.follower.create({
      data: createFollowerDto,
    });
  }

  // unfollow function

  async findAll() {
    return this.prisma.follower.findMany();
  }

  async findOne(id: string) {
    return this.prisma.follower.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.follower.delete({
      where: { id },
    });
  }

  // unfollow a user
  async unfollow(id: string) {
    // Check if the follower exists
    const follower = await this.prisma.follower.findUnique({
      where: { id },
    });

    console.log('hloooow', follower);

    if (!follower) {
      throw new NotFoundException('Follower not found');
    }

    // Use a transaction to ensure atomicity
    const result = await this.prisma.$transaction(async (prisma) => {
      // Delete the follower
      await prisma.follower.delete({
        where: { id },
      });

      // find the followRequest using the followerId and the followingId
      const res = await this._followRequestService.findFollowRequest(
        follower.followingId,
        follower.followerId,
      );

      if (!res) {
        throw new NotFoundException('Friend Request not found');
      }

      // delete the followRequest using the sercies
      await this._followRequestService.remove(
        res.id
      );

      return res;
    });

    return true;
  }

  // delete a friend request by taking a a users id
  async deleteFriendRequest(requesterId: string, requestedId: string) {
    return this.prisma.followRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: requesterId,
          receiverId: requestedId,
        },
      },
    });
  }
}
