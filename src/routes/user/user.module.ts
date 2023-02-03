import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MapUserRepository } from '../entity-repository/entity/MapUserRepository';

@Module({
  controllers: [UserController],
  providers: [UserService, MapUserRepository],
})
export class UserModule {}
