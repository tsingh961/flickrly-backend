import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FollowRequestStatus } from '@prisma/client';
import { CreateFollowRequestDto } from './dto/create-followRequest.dto';
import { PostgresClientService } from '@core/database/postgresClientService .service';
import { FollowersService } from '@follower/followers.service';
import { TCurrentUserType } from '@auth/types/user.type';
import { UpdateFollowRequestDto } from './dto/update.followRequest.dto';

@Injectable()
export class FollowRequestService {
  constructor(
    private prisma: PostgresClientService,
    @Inject(forwardRef(() => FollowersService))
    private readonly _followerService: FollowersService,
  ) {}

  // create the  friend request and also update the user's friend request
  // create the friend request and also update the user's friend request
  async create(
    createFollowRequestDto: CreateFollowRequestDto,
    user: TCurrentUserType,
  ) {
    createFollowRequestDto.senderId = user.sub;

    // check if the sender and the recipient are the same
    if (createFollowRequestDto.senderId === createFollowRequestDto.receiverId) {
      throw new ConflictException('You cannot send a request to yourself');
    }

    // Check if a follow request already exists
    const existingRequest = await this.prisma.followRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: createFollowRequestDto.senderId,
          receiverId: createFollowRequestDto.receiverId,
        },
      },
    });

    if (existingRequest) {
      throw new ConflictException('Follow request already exists');
    }

    // first check if the account requested is private or public
    const requestedTo = await this.prisma.user.findUnique({
      where: { id: createFollowRequestDto.receiverId },
      select: { isPrivate: true },
    });

    if (requestedTo.isPrivate) {
      createFollowRequestDto.status = FollowRequestStatus.PENDING;
    } else {
      createFollowRequestDto.status = FollowRequestStatus.ACCEPTED;
    }

    // create the friend request
    const followRequest = await this.prisma.followRequest.create({
      data: {
        sender: {
          connect: { id: createFollowRequestDto.senderId },
        },
        receiver: {
          connect: { id: createFollowRequestDto.receiverId },
        },
        status: createFollowRequestDto.status as FollowRequestStatus,
      },
    });

    // If the account requested is public, automatically follow the user
    if (followRequest.status === FollowRequestStatus.ACCEPTED) {
      // use the follower service to create the follower
      const followData = await this._followerService.create({
        followerId: followRequest.receiverId,
        followingId: followRequest.senderId,
      });
    }

    return followRequest;
  }

  // update the friend request status
  async update(
    id: string,
    updateFollowRequestDto: UpdateFollowRequestDto,
    user: TCurrentUserType,
  ) {
    // find the friend request
    const followRequest = await this.prisma.followRequest.findUnique({
      where: {
        id: id,
      },
    });

    if (!followRequest) {
      throw new NotFoundException('Friend request not found');
    }

    // check if the user is the receiver of the request
    if (followRequest.receiverId !== user.sub) {
      throw new ConflictException(
        'You are not authorized to update this request',
      );
    }

    // check if the request is already accepted
    if (followRequest.status === FollowRequestStatus.ACCEPTED) {
      throw new ConflictException('Request is already accepted');
    }

    // update the friend request status
    const res = await this.prisma.followRequest.update({
      where: { id: id },
      data: {
        status: updateFollowRequestDto.status as FollowRequestStatus,
      },
    });

    // if the friend request is accepted, then create a follow request
    if (updateFollowRequestDto.status === 'ACCEPTED') {
      // make a entry in the followers table
      const followData = await this._followerService.create({
        followerId: followRequest.receiverId,
        followingId: followRequest.senderId,
      });
    }

    return res;
  }

  // find all the friend requests
  async findAll(user: TCurrentUserType) {
    // always find the friend requests that are currently pending
    // and the user is the receiver
    return this.prisma.followRequest.findMany({
      where: {
        receiverId: user.sub,
        status: FollowRequestStatus.PENDING,
      },
    });
  }

  async findOne(id: string) {
    const friendRequest = await this.prisma.followRequest.findUnique({
      where: { id },
    });
    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }
    return friendRequest;
  }

  // async update(id: string, updateFriendRequestDto: CreateFollowRequestDto) {
  //   return this.prisma.followRequest.update({
  //     where: { id },
  //     data: updateFriendRequestDto,
  //   });
  // }

  // findFollowRequest 
  async findFollowRequest(senderId: string, receiverId: string) {
    return this.prisma.followRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.followRequest.delete({
      where: { id },
    });
  }
}
