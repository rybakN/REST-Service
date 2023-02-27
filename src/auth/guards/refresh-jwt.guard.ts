import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as process from 'process';
import * as jwt from 'jsonwebtoken';

export class RefreshJwtGuard extends AuthGuard('RefreshJwt') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { refreshToken } = req.body;

    if (refreshToken == undefined || typeof refreshToken !== 'string')
      throw new UnauthorizedException('No refresh token or it not a strings');

    try {
      jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
    return super.canActivate(context);
  }
}
