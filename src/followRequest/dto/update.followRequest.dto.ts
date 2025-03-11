import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowRequestDto } from './create-followRequest.dto';

export class UpdateFollowRequestDto extends PartialType(CreateFollowRequestDto) {}
