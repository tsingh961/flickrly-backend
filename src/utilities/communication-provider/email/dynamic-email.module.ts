import { Module } from '@nestjs/common';
import { DynamicEmailService } from './dynamic-email.service';
import { SendgridEmailService } from './providers/sendgrid.email.provider';

@Module({
  imports: [],
  providers: [DynamicEmailService, SendgridEmailService],
  exports: [DynamicEmailService],
})
export class DynamicEmailModule {}
