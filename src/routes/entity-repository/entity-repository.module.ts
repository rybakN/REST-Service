import { Module } from '@nestjs/common';
import { UsersRepository } from './entity/UsersRepository';
import { MapFavoritesRepository } from './entity/MapFavoritesRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { TrackRepository } from './entity/TrackRepository';
import { AlbumRepository } from './entity/AlbumRepository';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { ArtistRepository } from './entity/ArtistRepository';

@Module({
  providers: [
    UsersRepository,
    MapFavoritesRepository,
    TrackRepository,
    AlbumRepository,
    ArtistRepository,
  ],
  exports: [
    UsersRepository,
    MapFavoritesRepository,
    TrackRepository,
    AlbumRepository,
    ArtistRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TrackEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
})
export class EntityRepositoryModule {}
