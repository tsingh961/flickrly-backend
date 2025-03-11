import { RequestStatus } from '@core/constants/enums.constants';
import { FollowRequestStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFollowRequestDto {
  @IsUUID()
  @IsOptional()
  senderId?: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsOptional()
  @IsEnum(FollowRequestStatus)
  status?: string;
} 