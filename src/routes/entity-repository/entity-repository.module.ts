import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapTracksRepository } from './entity/MapTracksRepository';

@Module({
  providers: [MapUsersRepository, MapTracksRepository],
  exports: [MapUsersRepository, MapTracksRepository],
})
export class EntityRepositoryModule {}
