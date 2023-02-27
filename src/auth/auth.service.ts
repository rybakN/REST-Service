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
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: '60s',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_REFRESH'),
      expiresIn: '1d',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
