import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapTracksRepository } from './entity/MapTracksRepository';
import { MapArtistsRepository } from './entity/MapArtistsRepository';
import { MapAlbumsRepository } from './entity/MapAlbumsRepository';
import { MapFavoritesRepository } from './entity/MapFavoritesRepository';
import { MapEntityRepository } from './entity/MapEntityRepository';

@Module({
  providers: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
    MapFavoritesRepository,
    MapEntityRepository,
  ],
  exports: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
    MapFavoritesRepository,
    MapEntityRepository,
  ],
})
export class EntityRepositoryModule {}
