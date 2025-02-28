import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttachmentJSON {
  @IsString()
  content: string;

  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  disposition?: string;

  @IsOptional()
  @IsString()
  content_id?: string;
}

export class EmailData {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;

  @IsString()
  html: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentJSON)
  attachments?: AttachmentJSON[];

  @IsOptional()
  @IsEmail()
  reply_to?: any;

  @IsOptional()
  @IsNumber()
  send_at?: number;

  @IsOptional()
  @IsString()
  template_id?: string;
}
