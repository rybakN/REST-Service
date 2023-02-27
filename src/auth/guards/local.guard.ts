import { AuthGuard } from '@nestjs/passport';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { login, password } = req.body;
    if (
      login == undefined ||
      password == undefined ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    )
      throw new BadRequestException(
        'No login or password, or they are not a strings',
      );
    return super.canActivate(context);
  }
}
