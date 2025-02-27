import { IsOptional, IsString } from 'class-validator';

// Create an interface for the userAgentInfo object
export interface IUserAgentInfo {
  browserName?: string;
  browserVersion?: string;
  engineName?: string;
  engineVersion?: string;
  osName?: string;
  osVersion?: string;
  vendor?: string;
  model?: string;
  type?: string;
  architecture?: string;
}

export class UserAgentInfoDto implements IUserAgentInfo {
  @IsString()
  @IsOptional()
  browserName?: string;

  @IsString()
  @IsOptional()
  browserVersion?: string;

  @IsString()
  @IsOptional()
  engineName?: string;

  @IsString()
  @IsOptional()
  engineVersion?: string;

  @IsString()
  @IsOptional()
  osName?: string;

  @IsString()
  @IsOptional()
  osVersion?: string;

  @IsString()
  @IsOptional()
  vendor?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  architecture?: string;
}
