import { IsUUID } from 'class-validator';

export class CreateFollowerDto {
  @IsUUID()
  followerId: string;

  @IsUUID()
  followingId: string;
}