import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.create(createFollowerDto);
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