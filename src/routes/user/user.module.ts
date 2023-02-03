import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MapUsersRepository } from '../entity-repository/entity/MapUsersRepository';

@Module({
  controllers: [UserController],
  providers: [UserService, MapUsersRepository],
})
export class UserModule {}
