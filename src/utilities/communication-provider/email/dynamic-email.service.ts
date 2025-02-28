import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailData } from './dto/email.dto';
import { SendgridEmailService } from './providers/sendgrid.email.provider';
import { ApiConfigService } from '@core/config/config.service';

@Injectable()
export class DynamicEmailService implements EmailService, OnModuleInit {
  private _emailService: EmailService;

  constructor(
    private readonly _config: ApiConfigService,
    @Inject(SendgridEmailService)
    private readonly _sendgridEmailService: SendgridEmailService,
  ) {}

  onModuleInit() {
    const provider = this._config.email.emailProvider || 'default';

    switch (provider.toLowerCase()) {
      case 'sendgrid':
        this._emailService = this._sendgridEmailService;
        break;
      default:
        throw new Error(`Invalid email provider: ${provider}`);
    }
  }

  async sendEmail(data: EmailData): Promise<{ data: any; message: string }> {
    if (!this._emailService) {
      throw new Error('Email service not initialized');
    }

    return this._emailService.sendEmail(data);
  }
}
