import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapFavoritesRepository } from './entity/MapFavoritesRepository';
import { MapEntityRepository } from './entity/MapEntityRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  providers: [MapUsersRepository, MapFavoritesRepository, MapEntityRepository],
  exports: [MapUsersRepository, MapFavoritesRepository, MapEntityRepository],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class EntityRepositoryModule {}
