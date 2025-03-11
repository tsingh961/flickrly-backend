import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { ApiConfigService } from '@core/config/config.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as crypto from 'crypto';
import { JwtPayload } from './interface/auth.interface';
import { Tokens } from './types/tokens.type';
import { VerificationCodeService } from '@utilities/communication-provider/verification-code/verification-code.service';
import {
  getOtpMail,
  getOtpMailText,
} from '@utilities/communication-provider/communication.template';
import { CommunicationProviderService } from '@utilities/communication-provider/communication-provider.service';
import { DynamicEmailService } from '@utilities/communication-provider/email/dynamic-email.service';
import { VerificationCode } from '@utilities/communication-provider/verification-code/veification-code.schema';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';
import { GetCurrentUser, Public } from './common/decorators';
import { MESSAGE } from '@core/constants/generalMessages.constants';
import { TCurrentUserType } from './types/user.type';
import { expireTime1H } from '@core/utils/utils';
import { ResetPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
    private _configService: ApiConfigService,
    private _verificationCodeService: VerificationCodeService,
    private _dynamicEmailService: DynamicEmailService,
  ) {}

  // verify email address (valid eamil, email already exist)
  async verifyEmail(email: string): Promise<any> {
    // check if the email is valid check for top level domain name and @ symbol
    // Only allow Gmail and Outlook email addresses
    if (!email.match(/^\S+@(gmail\.com|outlook\.com)$/)) {
      return {
        data: {},
        message: 'Please enter a valid Gmail or Outlook email address',
        success: false,
      };
    }
    // check if the email already exists in the database
    const user = await this._userService.findByEmail(email);
    if (user) {
      return {
        data: {},
        message: 'This email is already in use',
        success: false,
      };
    }
    return {
      data: {},
      message: 'Email verification successful',
      success: true,
    };
  }

  // validate the username if already exist
  async validateUsername(username: string): Promise<any> {
    const user = await this._userService.findByUsername(username);
    if (user) {
      return {
        data: {},
        message: 'This username is already in use',
        success: false,
      };
    }
    return {
      data: {},
      message: 'This username is available',
      success: true,
    };
  }

  async sendOtpOnEmail(email: string): Promise<boolean> {
    // check if user with the same email already exists
    const user = await this._userService.findByEmail(email);
    if (user) {
      throw new ConflictException('User with the same email already exists');
    }
    const recipient = {
      name: 'User',
      email: email,
    };
    const otp = await this._generateOTP();
    const template = getOtpMail(recipient.name, otp.toString());

    const IsSend = await this._dynamicEmailService.sendEmail({
      to: email,
      subject: 'Verification Code',
      html: template,
      from: this._configService.email.emailFrom,
      text: getOtpMailText(recipient.name, otp.toString()),
    });

    if (!IsSend) {
      throw new ConflictException('Error sending OTP');
    }

    await this.saveOrUpdateVerificationCode(email, otp);

    return true;
  }

  async saveOrUpdateVerificationCode(
    email: string,
    otp: Number,
  ): Promise<void> {
    const emailData =
      await this._verificationCodeService.findByMobileNumberOrEmail({ email });

    const emailDto: Partial<VerificationCode> = {
      email,
      otp: otp,
      isVerified: false,
      timestamp: this._verificationCodeService.generate10minTimestamp(),
    };

    console.log('here');

    if (emailData) {
      await this._verificationCodeService.update(
        emailData._id.toString(),
        emailDto,
      );
    } else {
      console.log('here ');
      await this._verificationCodeService.create(emailDto);
    }
  }

  // verify the otp
  async verifyOtp(body: VerifyOtpDto): Promise<any> {
    const { email, otp } = body;
    const emailData =
      await this._verificationCodeService.findByMobileNumberOrEmail({ email });

    if (!emailData) {
      console.log('here');
      return {
        data: {},
        message: 'Invalid OTP',
        success: false,
      };
    }

    if (emailData.otp !== otp) {
      console.log('here');
      return {
        data: {},
        message: 'Invalid OTP',
        success: false,
      };
    }

    if (emailData.isVerified) {
      return {
        data: {},
        message: 'OTP already verified',
        success: false,
      };
    }

    const currentTime = new Date().getTime();
    if (currentTime > emailData.timestamp) {
      return {
        data: {},
        message: 'OTP expired',
        success: false,
      };
    }

    await this._verificationCodeService.update(emailData._id.toString(), {
      isVerified: true,
    });

    return {
      data: {},
      message: 'OTP verified successfully',
      success: true,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this._userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, refreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  // signin
  async signup(signinDto: SignupDto): Promise<{ tokens: Tokens; user: User }> {
    // check if the email is verified or not
    const emailData =
      await this._verificationCodeService.findByMobileNumberOrEmail({
        email: signinDto.email,
      });

    if (!emailData || !emailData.isVerified) {
      throw new UnauthorizedException('Email is not verified');
    }

    // check if the user already exists
    const userExist = await this._userService.findByEmail(signinDto.email);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.generateHashPassword(signinDto.password);
    const user = await this._userService.createUser({
      email: signinDto.email,
      password: hashedPassword,
      username: signinDto.username,
      fullName: signinDto.fullName,
    });

    // check if the user is created
    if (!user) {
      throw new ConflictException('Error creating user');
    }

    console.log('i am here');

    const tokens = await this._getTokens(
      user.email,
      user.id,
      user.fullName,
      'user',
    );

    console.log('tokens', tokens);

    // now save the token in the user table for future use
    const hashedToken = await this._hashToken(tokens.refresh_token);
    console.log('hashedToken', hashedToken);
    await this._userService.update(user.id, { refreshToken: hashedToken });
    return { tokens: tokens, user: user };
  }

  // signin user with email and password
  async signin(signinDto: SigninDto): Promise<{ tokens: Tokens; user: User }> {
    const user = await this.validateUser(signinDto.email, signinDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this._getTokens(
      user.email,
      user.id,
      user.fullName,
      'user',
    );

    // now save the token in the user table for future use
    const hashedToken = await this._hashToken(tokens.refresh_token);
    await this._userService.update(user.id, { refreshToken: hashedToken });
    return { tokens: tokens, user: user };
  }

  // refresh token
  async refresh(userId: string, rt: string, currentUser: any): Promise<Tokens> {
    const user = await this._userService.findOne(userId);

    if (!user) {
      throw new NotFoundException(MESSAGE.USER.NOT_FOUND);
    }

    const isRTEqual = await bcrypt.compare(rt, user.refreshToken);

    if (!isRTEqual) {
      throw new BadRequestException(MESSAGE.AUTH.ERROR.TOKEN_REFRESH_FAILED);
    }

    const tokens = await this._getTokens(
      user.email,
      user.id,
      user.fullName,
      'user',
    );

    // now save the token in the user table for future use
    const hashedToken = await this._hashToken(tokens.refresh_token);

    await this._userService.update(user.id, { refreshToken: hashedToken });

    return tokens;
  }

  async logout(user: TCurrentUserType): Promise<{ message: string }> {
    try {
      // mark the refresh token as null in the database to prevent further use
      await this._userService.update(user.sub, { refreshToken: '' });

      return { message: MESSAGE.AUTH.LOGOUT_SUCCESSFUL };
    } catch (error) {
      throw error;
    }
  }

  // forget password
  async forgetPassword(body: { email: string }): Promise<{ message: string }> {
    const { email } = body;

    const user = await this._userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // check if the otp has been already sent in last 30 minutes
    const emailData =
      await this._verificationCodeService.findByMobileNumberOrEmail({ email });
    if (emailData && emailData.timestamp > new Date().getTime() - 1800000) {
      throw new BadRequestException(
        'OTP already sent in last 30 minutes Please try again later',
      );
    }

    const otp = await this._generateOTP();
    const template = getOtpMail(user.fullName, otp.toString());

    const IsSend = await this._dynamicEmailService.sendEmail({
      to: email,
      subject: 'Verification Code',
      html: template,
      from: this._configService.email.emailFrom,
      text: getOtpMailText(user.fullName, otp.toString()),
    });

    if (!IsSend) {
      throw new ConflictException('Error sending OTP');
    }

    await this.saveOrUpdateVerificationCode(email, otp);

    return {
      message: 'Verification code sent to your email',
    };
  }

  // verify the forget password OTP and generate token for reset password
  async verifyForgetPasswordOtp(
    body: VerifyOtpDto,
  ): Promise<{ message: string; resetToken: string }> {
    const { email, otp } = body;

    const emailData =
      await this._verificationCodeService.findByMobileNumberOrEmail({ email });

    if (!emailData) {
      throw new NotFoundException('Invalid OTP');
    }

    if (emailData.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (emailData.isVerified) {
      throw new BadRequestException('OTP already verified');
    }

    const currentTime = new Date().getTime();
    if (currentTime > emailData.timestamp) {
      throw new BadRequestException('OTP expired');
    }

    await this._verificationCodeService.update(emailData._id.toString(), {
      isVerified: true,
    });

    // Generate the reset token
    const resetToken = await this._jwtService.signAsync(
      { email },
      {
        secret: this._configService.jwt.refreshSecret,
        expiresIn: expireTime1H,
      },
    );

    return {
      message: 'OTP verified successfully',
      resetToken,
    };
  }

  // reset password using the reset token
  async resetPassword(body: ResetPasswordDto): Promise<{ message: string }> {
    const { email } = await this._jwtService.verifyAsync(body.token, {
      secret: this._configService.jwt.refreshSecret,
    });

    const user = await this._userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await this.generateHashPassword(body.password);

    await this._userService.update(user.id, { password: hashedPassword });

    return {
      message: 'Password reset successfully',
    };
  }

  async generateTokens(user: any): Promise<Tokens> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this._jwtService.sign(payload),
      refresh_token: this._jwtService.sign(payload, {
        expiresIn: this._configService.jwt.refreshExpires,
      }),
    };
  }

  private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async _getTokens(
    email: string,
    userId: string,
    name: string,
    userType: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      name,
      userType,
    };

    const [at, rt] = await Promise.all([
      this._jwtService.signAsync(jwtPayload, {
        secret: this._configService.jwt.accessSecret,
        expiresIn: this._configService.jwt.accessExpires,
      }),
      this._jwtService.signAsync(jwtPayload, {
        secret: this._configService.jwt.refreshSecret,
        expiresIn: this._configService.jwt.refreshExpires,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // Helper method to hash the token
  private async _hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 10);
  }

  // Helper method to generate a 32-character pseudorandom token
  private _generateToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private _generateOTP(): Promise<number> {
    return new Promise((resolve, reject) => {
      crypto.randomInt(100000, 999999, (err, n) => {
        if (err) reject(err);

        return resolve(n);
      });
    });
  }
}
