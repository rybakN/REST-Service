import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../routes/user/user.service';
import { UserEntity } from '../routes/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
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
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
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
      accessToken: this.jwtService.sign(payload),
    };
  }
}
