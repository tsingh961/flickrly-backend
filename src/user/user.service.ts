import { PostgresClientService } from '@core/database/postgresClientService .service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PostgresClientService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
      },
    });
  }

  // update user
  async update(id: string, user): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  // Get all followers of a user
  async getFollowers(userId: string) {
    // fetch all the followers list of a user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          include: {
            // follower: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Get all followings of a user
  async getFollowings(userId: string) {
    console.log('userId', userId);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: {
          include: {
            // following: true,
            follower: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // find user by username
  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
