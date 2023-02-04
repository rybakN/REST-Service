import { Module } from '@nestjs/common';
import { MapUsersRepository } from './entity/MapUsersRepository';
import { MapTracksRepository } from './entity/MapTracksRepository';
import { MapArtistsRepository } from './entity/MapArtistsRepository';
import { MapAlbumsRepository } from './entity/MapAlbumsRepository';
import { MapFavoritesRepository } from './entity/MapFavoritesRepository';

@Module({
  providers: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
    MapFavoritesRepository,
  ],
  exports: [
    MapUsersRepository,
    MapTracksRepository,
    MapArtistsRepository,
    MapAlbumsRepository,
    MapFavoritesRepository,
  ],
})
export class EntityRepositoryModule {}
