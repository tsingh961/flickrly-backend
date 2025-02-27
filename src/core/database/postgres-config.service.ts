import { ApiConfigService } from '@core/config/config.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostgresConfigService
  extends PrismaClient
  implements OnModuleInit
{
  private readonly _logger = new Logger(PostgresConfigService.name);
  constructor(private _config: ApiConfigService) {
    super({
      datasources: {
        db: {
          url: _config.postgresDB.uri,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this._logger.log('Connected to PostgreSQL database');
  }

  async enableShutdownHooks() {
    process.on('beforeExit', async () => {
      await this.$disconnect();
    });
  }
}
