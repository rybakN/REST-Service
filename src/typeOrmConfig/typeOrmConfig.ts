import { UserEntity } from '../routes/user/entities/user.entity';
import { AlbumEntity } from '../routes/albums/entities/album.entity';
import { TrackEntity } from '../routes/tracks/entities/track.entity';
import { ArtistEntity } from '../routes/artists/entities/artist.entity';
import * as process from 'process';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const TypeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [UserEntity, AlbumEntity, TrackEntity, ArtistEntity],
  synchronize: false,
  migrationsRun: true,
};
