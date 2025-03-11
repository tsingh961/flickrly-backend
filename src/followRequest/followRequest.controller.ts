import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
  ConflictException,
  UnprocessableEntityException,
  Logger,
  Inject,
  InternalServerErrorException,
  Put,
} from '@nestjs/common';
import { CreateFollowRequestDto } from './dto/create-followRequest.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TApiResponse, TResponse } from '@core/types/response';
import { FollowRequestService } from './followRequest.service';
import { GetCurrentUser } from '@auth/common/decorators';
import { TCurrentUserType } from '@auth/types/user.type';
import { UpdateFollowRequestDto } from './dto/update.followRequest.dto';

@Controller('friend-requests')
export class FollowRequestController {
  constructor(
    private readonly friendRequestService: FollowRequestService,
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
  async create(
    @Body() createFriendRequestDto: CreateFollowRequestDto,
    @GetCurrentUser() user: TCurrentUserType,
  ): Promise<TApiResponse> {
    try {
      const res = await this.friendRequestService.create(
        createFriendRequestDto,
        user
      );
      return {
        data: {},
        message: 'Friend request created successfully',
      };
    } catch (error) {
      this._handleError(error, 'Error creating friend request');
    }
  }

  // update the friend request status
  @Put(':id')
  async update(
    @Body() updateFriendRequestDto: UpdateFollowRequestDto,
    @Param('id') id: string,
    @GetCurrentUser() user: TCurrentUserType,
  ): Promise<TApiResponse> {
    try {
      const res = await this.friendRequestService.update(
        id,
        updateFriendRequestDto,
        user,
      );

     
      return {
        data: res,
        message: 'Friend request updated successfully',
      };
    } catch (error) {
      this._handleError(error, 'Error updating friend request');
    }
  }

 // find all friend requests
  @Get()
  async findAll(
     @GetCurrentUser() user: TCurrentUserType,
  ): Promise<TApiResponse> {
    try {
      const res = await this.friendRequestService.findAll(user);
      return {
        data: res,
        message: 'Friend requests fetched successfully',
      };
    } catch (error) {
      this._handleError(error, 'Error fetching friend requests');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendRequestService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFriendRequestDto: CreateFollowRequestDto,
  // ) {
  //   return this.friendRequestService.update(id, updateFriendRequestDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendRequestService.remove(id);
  }
}
