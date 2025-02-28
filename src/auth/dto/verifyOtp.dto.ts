import { IsEmail, IsInt, IsNotEmpty, IsNumberString } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  otp: number;
}
