import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapTracksRepository } from './entity/MapTracksRepository';
import { MapArtistsRepository } from './entity/MapArtistsRepository';
import { MapAlbumsRepository } from './entity/MapAlbumsRepository';

@Module({
  providers: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
  ],
  exports: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
  ],
})
export class EntityRepositoryModule {}
