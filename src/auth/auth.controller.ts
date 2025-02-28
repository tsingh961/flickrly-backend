import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Logger,
  Inject,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TApiResponse } from '@core/types/response';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly _logger: Logger,
  ) {}

  private _handleError(error: any, defaultMessage: string): never {
    this._logger.error(
      `${defaultMessage}: ${error.message}`,
      error.stack,
      this.constructor.name,
    );
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException ||
      error instanceof UnauthorizedException ||
      error instanceof ForbiddenException ||
      error instanceof ConflictException ||
      error instanceof UnprocessableEntityException
    ) {
      throw error;
    }
    throw new InternalServerErrorException(defaultMessage);
  }

  // validate the email address
  @Post('email')
  async verifyEmail(@Body('email') email: string): Promise<TApiResponse> {
    try {
      const result = await this.authService.verifyEmail(email);
      return {
        data: {},
        message: result.message,
        success: result.success,
      };
    } catch (error) {
      this._handleError(error, 'Error verifying email');
    }
  }

  // send otp to the email address
  @Post('otp')
  async sendOtp(@Body('email') email: string): Promise<TApiResponse> {
    try {
      const result = await this.authService.sendOtpOnEmail(email);
      return {
        data: {},
        message: 'OTP sent successfully',
        success: result,
      };
    } catch (error) {
      this._handleError(error, 'Error sending OTP');
    }
  }

  // verify the otp
  @Post('otp/verify')
  async verifyOtp(
    @Body() body: VerifyOtpDto,
    @Body('otp') otp: Number,
  ): Promise<TApiResponse> {
    try {
      const result = await this.authService.verifyOtp(body);
      return {
        data: {},
        message: result.message,
        success: result.success,
      };
    } catch (error) {
      this._handleError(error, 'Error verifying OTP');
    }
  }

  // validate the username
  @Post('username')
  async validateUsername(
    @Body('username') username: string,
  ): Promise<TApiResponse> {
    try {
      const result = await this.authService.validateUsername(username);
      return {
        data: {},
        message: result.message,
        success: result.success,
      };
    } catch (error) {
      this._handleError(error, 'Error validating username');
    }
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<TApiResponse> {
    try {
      const result = await this.authService.signup(signupDto);
      return {
        data: result,
        message: 'User signed up successfully',
        success: true,
      };
    } catch (error) {
      this._handleError(error, 'Error signing up');
    }
  }

  // login route
  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<TApiResponse> {
    try {
      const result = await this.authService.signin(signinDto);
      return {
        data: result,
        message: 'User signed in successfully',
        success: true,
      };
    } catch (error) {
      this._handleError(error, 'Error signing in');
    }
  }

 // refresh token route
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TApiResponse> {
    try {
      const result = await this.authService.refreshToken(refreshTokenDto);
      return {
        data: result,
        message: 'Token refreshed successfully',
        success: true,
      };
    } catch (error) {
      this._handleError(error, 'Error refreshing token');
    }
  }

  //   @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    // Invalidate the token (implementation depends on your setup)
    return { message: 'Logged out successfully' };
  }
}
