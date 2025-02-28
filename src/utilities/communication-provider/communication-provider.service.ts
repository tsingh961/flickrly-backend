import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class CommunicationProviderService {
  private readonly twilioClient: Twilio;

  constructor() {
    const { TWILIO_SID, TWILIO_AUTH_TOKEN } = process.env;
    this.twilioClient = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
  }
}
