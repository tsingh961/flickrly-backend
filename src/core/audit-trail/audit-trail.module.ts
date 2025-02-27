import { Module } from '@nestjs/common';
import { AuditTrailController } from './audit-trail.controller';
import { AuditTrailService } from './audit-trail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditTrail, auditTrailSchema } from './entities/audit-trail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditTrail.name, schema: auditTrailSchema },
    ]),
  ],
  controllers: [AuditTrailController],
  providers: [AuditTrailService],
  exports: [AuditTrailService],
})
export class AuditTrailModule {}
