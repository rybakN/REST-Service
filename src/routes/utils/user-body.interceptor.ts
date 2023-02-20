import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class UserBodyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserEntity | UserEntity[] | undefined> {
    return next.handle().pipe(
      map((value) => {
        if (!value) return value;
        if (Array.isArray(value)) return this.changeAllUser(value);
        return this.changeUser(value);
      }),
    );
  }

  private changeUser(user: UserEntity): Omit<UserEntity, 'password'> {
    const copyUser: UserEntity = { ...user };
    delete copyUser.password;
    return copyUser;
  }

  private changeAllUser(users: UserEntity[]): Omit<UserEntity, 'password'>[] {
    if (!users.length) return users;
    return users.map((user) => this.changeUser(user));
  }
}
