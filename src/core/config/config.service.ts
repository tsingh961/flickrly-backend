import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  IApiConfig,
  ICorsConfig,
  IEnvironmentConfig,
  IFileUploadConfig,
  IGupshupConfig,
  IJwtConfig,
  IMongoDbConfig,
  IRateLimitConfig,
  IEmailConfig,
  PostgresDbConfig,
} from './env.interface';

@Injectable()
export class ApiConfigService {
  private _apiConfigs: IApiConfig;
  private _cors: Readonly<ICorsConfig>;
  private _environment: Readonly<IEnvironmentConfig>;
  private _jwt: Readonly<IJwtConfig>;
  private _mongoDB: Readonly<IMongoDbConfig>;
  private _postgresDB: Readonly<PostgresDbConfig>;
  // private _gupshup: Readonly<IGupshupConfig>;
  // private _version: string;
  // private _webSiteUrl: string; // Add this line
  // private _fileUpload: Readonly<IFileUploadConfig>;
  private _rateLimit: IRateLimitConfig;
  private _email: Readonly<IEmailConfig>;

  constructor(private readonly _configService: ConfigService) {
    const origins = this._configService.get<string>('CORS_ORIGINS').split(',');
    const corsOrigins: (RegExp | string)[] = origins.map((origin) => {
      if (origin.startsWith('/') && origin.endsWith('/')) {
        const regexString = origin.slice(1, -1);
        return new RegExp(regexString);
      }
      return origin;
    });

    this._cors = {
      credentials: this._configService.get<boolean>('CORS_CREDENTIALS'),
      origin: corsOrigins,
    };

    this._environment = {
      dev: this._configService.get<string>('DEV'),
      isProd:
        this._configService.get<string>('NODE_ENV') ===
        this._configService.get<string>('PROD'),
      nodeEnv: this._configService.get<string>('NODE_ENV'),
      port: this._configService.get<number>('PORT', 3003),
      prod: this._configService.get<string>('PROD'),
      hosted_url: this._configService.get<string>('HOSTED_URL'),
    };

    this._mongoDB = {
      database: this._configService.get<string>('MONGODB_DATABASE'),
      password: this._configService.get<string>('MONGODB_PASSWORD'),
      uri: this._configService.get<string>('MONGODB_URI'),
      username: this._configService.get<string>('MONGODB_USERNAME'),
    };

    this._postgresDB = {
      uri: this._configService.get<string>('POSTGRES_URI'),
    };

    this._jwt = {
      accessExpires: this._configService.get<string>('JWT_ACCESS_EXPIRATION'),
      accessSecret: this._configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      refreshExpires: this._configService.get<string>('JWT_REFRESH_EXPIRATION'),
      refreshSecret: this._configService.get<string>(
        'JWT_REFRESH_TOKEN_SECRET',
      ),
    };
    this._rateLimit = {
      limit: this._configService.get<number>('RATE_LIMIT', 10),
      ttl: this._configService.get<number>('RATE_LIMIT_TTL', 60),
    };
    this._email = {
      emailProvider: this._configService.get<string>('EMAIL_PROVIDER'),
      emailApiKey: this._configService.get<string>('EMAIL_API_KEY'),
      emailFrom: this._configService.get<string>('EMAIL_FROM'),
    };
  }

  get cors(): ICorsConfig {
    return this._cors;
  }

  get environment(): IEnvironmentConfig {
    return this._environment;
  }

  get jwt(): IJwtConfig {
    return this._jwt;
  }

  get mongoDB(): IMongoDbConfig {
    return this._mongoDB;
  }

  get postgresDB(): PostgresDbConfig {
    return this._postgresDB;
  }

  get rateLimit(): IRateLimitConfig {
    return this._rateLimit;
  }
  get email(): IEmailConfig {
    return this._email;
  }
}
