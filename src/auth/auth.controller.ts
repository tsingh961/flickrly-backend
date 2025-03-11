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
  HttpCode,
  HttpStatus,
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
import { GetCurrentUser, Public } from './common/decorators';
import { RtGuard } from './common/gaurds';
import { TCurrentUserType } from './types/user.type';
import { MESSAGE } from '@core/constants/generalMessages.constants';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
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
  @Public()
  @Post('email')
  async verifyEmail(@Body('email') email: string): Promise<TApiResponse> {
    try {
      const result = await this._authService.verifyEmail(email);
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
  @Public()
  @Post('otp')
  async sendOtp(@Body('email') email: string): Promise<TApiResponse> {
    try {
      const result = await this._authService.sendOtpOnEmail(email);
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
  @Public()
  @Post('otp/verify')
  async verifyOtp(
    @Body() body: VerifyOtpDto,
    @Body('otp') otp: Number,
  ): Promise<TApiResponse> {
    try {
      const result = await this._authService.verifyOtp(body);
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
  @Public()
  @Post('username')
  async validateUsername(
    @Body('username') username: string,
  ): Promise<TApiResponse> {
    try {
      const result = await this._authService.validateUsername(username);
      return {
        data: {},
        message: result.message,
        success: result.success,
      };
    } catch (error) {
      this._handleError(error, 'Error validating username');
    }
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<TApiResponse> {
    try {
      const result = await this._authService.signup(signupDto);
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
  @Public()
  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<TApiResponse> {
    try {
      const result = await this._authService.signin(signinDto);
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
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUser() user: TCurrentUserType,
  ): Promise<TApiResponse> {
    try {
      console.log('user', user);
      const data = await this._authService.refresh(
        user.sub,
        user.refreshToken,
        user,
      );
      return { data, message: MESSAGE.AUTH.TOKEN_REFRESH };
    } catch (error) {
      this._handleError(error, MESSAGE.AUTH.ERROR.TOKEN_REFRESH_FAILED);
    }
  }

  @Post('logout')
  async logout(
    @GetCurrentUser() user: TCurrentUserType,
  ): Promise<TApiResponse> {
    try {
      console.log('user', user);
      const data = await this._authService.logout(user);
      return {
        data: {},
        message: MESSAGE.AUTH.LOGOUT_SUCCESSFUL,
      };
    } catch (error) {
      this._handleError(error, MESSAGE.AUTH.ERROR.LOGOUT_FAILED);
    }
  }

  @Public()
  @Post('forget-password')
  async forgetPassword(@Body() body: ForgotPasswordDto): Promise<TApiResponse> {
    try {
      const data = await this._authService.forgetPassword({
        email: body.email,
      });

      return {
        data: {},
        message: data.message,
      };
    } catch (error) {
      this._handleError(error, MESSAGE.AUTH.ERROR.FORGET_PASSWORD_FAILED);
    }
  }

  // verify the forget password OTP and generate token for reset password
  @Public()
  @Post('verify-forget-password-otp')
  async verifyForgetPasswordOtp(
    @Body() body: VerifyOtpDto,
  ): Promise<TApiResponse> {
    try {
      const data = await this._authService.verifyForgetPasswordOtp(body);
      return {
        data: { resetToken: data.resetToken },
        message: data.message,
      };
    } catch (error) {
      this._handleError(
        error,
        MESSAGE.AUTH.ERROR.VERIFY_FORGET_PASSWORD_OTP_FAILED,
      );
    }
  }

  // reset password with token
  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<TApiResponse> {
    try {
      const data = await this._authService.resetPassword(body);
      return {
        data: {},
        message: data.message,
      };
    } catch (error) {
      this._handleError(error, MESSAGE.AUTH.ERROR.RESET_PASSWORD_FAILED);
    }
  }

  // reset password
  // @Public()
  // @Post('reset-password')
  // async resetPassword(
  //   @Body('token') token: string,
  //   @Body('password') password: string,
  // ): Promise<TApiResponse> {
  //   try {
  //     const data = await this._authService.resetPassword(token, password);
  //     return {
  //       data: {},
  //       message: data.message,
  //     };
  //   } catch (error) {
  //     this._handleError(error, MESSAGE.AUTH.ERROR.RESET_PASSWORD_FAILED);
  //   }
  // }
}
