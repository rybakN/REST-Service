import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'RefreshJwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_REFRESH,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, login: payload.login };
  }
}
