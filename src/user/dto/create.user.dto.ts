import { IsString, IsEmail, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string; // Required

  @IsEmail()
  email: string; // Required

  @IsString()
  password: string; // Required

  @IsString()
  fullName: string; // Required

  @IsString()
  @IsOptional()
  profilePicture?: string; // Optional

  @IsString()
  @IsOptional()
  bio?: string; // Optional

  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean; // Optional

  @IsString()
  @IsOptional()
  dateOfBirth?: string; // Optional (use string for flexibility, convert to Date in service)

  @IsString()
  @IsOptional()
  gender?: string; // Optional

  @IsString()
  @IsOptional()
  location?: string; // Optional

  @IsArray()
  @IsOptional()
  interests?: string[]; // Optional
}