import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapFavoritesRepository } from './entity/MapFavoritesRepository';
import { MapEntityRepository } from './entity/MapEntityRepository';

@Module({
  providers: [MapUsersRepository, MapFavoritesRepository, MapEntityRepository],
  exports: [MapUsersRepository, MapFavoritesRepository, MapEntityRepository],
})
export class EntityRepositoryModule {}
