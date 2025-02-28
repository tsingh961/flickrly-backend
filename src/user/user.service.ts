import { PostgresClientService } from '@core/database/postgresClientService .service';
import { Injectable } from '@nestjs/common';
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
