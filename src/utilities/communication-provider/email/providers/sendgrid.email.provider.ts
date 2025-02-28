import { Injectable } from '@nestjs/common';
import SendGrid from '@sendgrid/mail';
import { EmailService } from '../email.service';
import { EmailData } from '../dto/email.dto';
import { ApiConfigService } from '@core/config/config.service';

@Injectable()
export class SendgridEmailService implements EmailService {
  constructor(private _config: ApiConfigService) {
    const apiKey = this._config.email.emailApiKey;

    if (!apiKey) {
      throw new Error('SendGrid API key is not configured');
    }
    SendGrid.setApiKey(apiKey); // Correct method usage
  }

  async sendEmail(data: EmailData): Promise<{ data: any; message: string }> {
    const msg = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
      attachments: data.attachments,
      reply_to: data.reply_to,
      send_at: data.send_at,
      template_id: data.template_id,
    };

    try {
      const response = await SendGrid.send(msg);
      return { data: response, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
