import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TCurrentUserType } from '@auth/types/user.type';
import { GetCurrentUser } from '@auth/common/decorators';

@Controller('followers')
export class FollowersController {
  constructor(
    private readonly followersService: FollowersService,
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

  @Post()
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.create(createFollowerDto);
  }

  // unfollow a user
  @Delete('unfollow/:id')
  async unfollow(
    @Param('id') id: string,
  ) {
    try {
      const res = await this.followersService.unfollow(id);
      return {
        message: 'User unfollowed successfully',
        data: res,
      };
    } catch (error) {
      this._handleError(error, 'Error while unfollowing user');
    }
  }

  @Get()
  findAll() {
    return this.followersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followersService.remove(id);
  }
}
