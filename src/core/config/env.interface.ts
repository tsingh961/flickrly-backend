/* eslint-disable @typescript-eslint/naming-convention */
export interface IEnvironmentConfig {
  dev: string;
  isProd: boolean;
  nodeEnv: string;
  port: number;
  prod: string;
  hosted_url: string;
}

export interface IJwtConfig {
  accessExpires: string;
  accessSecret: string;
  refreshExpires: string;
  refreshSecret: string;
}

export interface ICorsConfig {
  credentials: boolean;
  origin: (RegExp | string)[];
}

export interface ICorsConfig {
  credentials: boolean;
  origin: (RegExp | string)[];
}

export interface IMongoDbConfig {
  database: string;
  password: string;
  uri: string;
  username: string;
}

export interface IMongoDbConfig {
  database: string;
  password: string;
  uri: string;
  username: string;
}

export interface PostgresDbConfig {
  uri: string;
}

export interface IGupshupConfig {
  sessionUrl: string;
  templateUrl: string;
  optinUrl: string;
}

export interface IApiConfig {
  retryCount: number;
  authApi: string;
}

// add the BRAND NAME

export interface IFileUploadConfig {
  uploadService: string;
  awsAccessKey?: string;
  awsSecretKey?: string;
  awsS3Region?: string;
  awsS3BucketName?: string;
  cloudinaryCloudName?: string;
  cloudinaryApiKey?: string;
  cloudinarySecretKey?: string;
  sshServerChunkPath?: string;
  uploadStrategy?: string;
  chunkSize?: number;
  baseUrl: string;
  brandName: string;
}

export interface IRateLimitConfig {
  limit: number;
  ttl: number;
}

export interface ISendGridConfig {
  apiKey: string;
  fromEmail: string;
}

export interface IEmailConfig {
  emailProvider: string;
  emailApiKey: string;
  emailFrom: string;
}
