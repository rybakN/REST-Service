import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, params } = req;
    this.logger.log(
      `HTTP Request: URL: ${originalUrl} | Method: ${method} | Body: ${JSON.stringify(
        body,
      )} | Params: ${JSON.stringify(params)}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Response status code: ${statusCode}`);
    });
    next();
  }
}
