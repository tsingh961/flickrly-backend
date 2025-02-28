import { EmailData } from './dto/email.dto';

export abstract class EmailService {
  abstract sendEmail(data: EmailData): Promise<{
    data: any;
    message: string;
  }>;
}
