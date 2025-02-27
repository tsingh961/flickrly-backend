import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  validateSync,
} from 'class-validator';

enum TEnvironment {
  development = 'development',
  local = 'local',
  production = 'production',
}

enum TUploadService {
  aws = 'aws',
  cloudinary = 'cloudinary',
  local = 'local',
}

type TEnvironments = keyof typeof TEnvironment;

export class EnvironmentVariables {
  // CORS
  @IsBoolean()
  @IsNotEmpty()
  CORS_CREDENTIALS: boolean;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGINS: string;

  // DATABASE
  @IsString()
  @IsNotEmpty()
  MONGODB_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  HOSTED_URL: string;

  @IsString()
  @IsOptional()
  MONGODB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI: string;

  @IsString()
  @IsOptional()
  MONGODB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TEnvironment)
  NODE_ENV: TEnvironments;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  BASE_URL: string;

  // add the Brandname
  @IsString()
  @IsNotEmpty()
  BRAND_NAME: string;

  // Rate Limit
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  RATE_LIMIT: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  RATE_LIMIT_TTL: number;

  @IsString()
  @IsNotEmpty()
  EMAIL_PROVIDER: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_FROM: string;
}

export function validate(config: Record<string, unknown>): any {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
