import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { PostgresClientService } from '@core/database/postgresClientService .service';

@Injectable()
export class FollowersService {
  constructor(private prisma: PostgresClientService) {}

  async create(createFollowerDto: CreateFollowerDto) {
    return this.prisma.follower.create({
      data: createFollowerDto,
    });
  }

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