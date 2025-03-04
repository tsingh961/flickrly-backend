import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  Inject,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UpdateUserDto } from './dto/update.user.dto';
import { TCurrentUserType } from '@auth/types/user.type';
import { GetCurrentUser } from '@auth/common/decorators';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly _logger: Logger,
  ) {}

  private _handleError(error: any, defaultMessage: string): never {
    this._logger.error(
      `${defaultMessage}: ${error.message}`,
      error.stack,
      this.constructor.name,
    );
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException ||
      error instanceof UnauthorizedException ||
      error instanceof ForbiddenException ||
      error instanceof ConflictException ||
      error instanceof UnprocessableEntityException
    ) {
      throw error;
    }
    throw new InternalServerErrorException(defaultMessage);
  }

  // create user route
  @Post()
  async create(@Body() user: CreateUserDto) {
    try {
      const res = await this.userService.createUser(user);
      return {
        message: 'User created successfully',
        data: res,
      };
    } catch (error) {
      this._handleError(error, 'Error while creating user');
    }
  }

  // update the user
  @Post(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    try {
      const res = await this.userService.update(id, user);
      return {
        message: 'User updated successfully',
        data: res,
      };
    } catch (error) {
      this._handleError(error, 'Error while updating user');
    }
  }

  // get all the followers of a user
  @Get('followers')
  async getFollowers(@GetCurrentUser() user: TCurrentUserType) {
    try {
      console.log('hi', user.name);
      const res = await this.userService.getFollowers(user.sub);
      return {
        message: 'Followers fetched successfully',
        data: res,
      };
    } catch (error) {
      this._handleError(error, 'Error while fetching followers');
    }
  }

  // get all the followings of a user
  @Get('followings')
  async getFollowings(@GetCurrentUser() user: TCurrentUserType) {
    try {
      console.log('hi', user.name);
      const res = await this.userService.getFollowings(user.sub);
      return {
        message: 'Followings fetched successfully',
        data: res,
      };
    } catch (error) {
      this._handleError(error, 'Error while fetching followings');
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
