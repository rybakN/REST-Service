import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

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
    return super.canActivate(context);
  }
}
