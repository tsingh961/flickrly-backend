import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export interface ILocation {
  range?: [number, number];
  country?: string;
  region?: string;
  eu?: string;
  timezone?: string;
  city?: string;
  ll?: [number, number];
  metro?: number;
  area?: number;
}

export class LocationDto implements ILocation {
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  range?: [number, number];

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  eu?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  ll?: [number, number];

  @IsNumber()
  @IsOptional()
  metro?: number;

  @IsNumber()
  @IsOptional()
  area?: number;
}
