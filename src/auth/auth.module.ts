import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../routes/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../routes/user/user.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { EntityRepositoryModule } from '../routes/entity-repository/entity-repository.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';

@Module({
  imports: [
    PassportModule,
    EntityRepositoryModule,
    UserModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
