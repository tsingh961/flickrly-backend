import { Module } from '@nestjs/common';
import { CommunicationProviderService } from './communication-provider.service';
import { DynamicEmailModule } from './email/dynamic-email.module';

@Module({
  imports: [DynamicEmailModule],
  providers: [CommunicationProviderService],
  exports: [CommunicationProviderService],
})
export class CommunicationProviderModule {}
