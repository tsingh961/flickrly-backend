/* eslint-disable prefer-const */
import { ApiConfigService } from '@core/config/config.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _apiConfigService: ApiConfigService) {}
  organizationId;
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    next();
  }
}
