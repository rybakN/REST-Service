import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../routes/user/user.service';
import { UserEntity } from '../routes/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(login: string, password: string): Promise<any> {
    const user: UserEntity = await this.usersService.getUser({
      login: login,
    });
    if (!user)
      throw new ForbiddenException(
        "No user with such login or password doesn't match actual one",
      );
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: UserEntity) {
    const payload = { login: user.login, sub: user.id };
    return {
      id: user.id,
      login: user.login,
      ...this.getTokens(payload),
    };
  }

  async refreshToken(user) {
    const payload = { login: user.login, sub: user.id };
    return {
      id: user.id,
      login: user.login,
      ...this.getTokens(payload),
    };
  }

  private getTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME') || '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn:
        this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME') || '24h',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
