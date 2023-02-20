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
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, AlbumEntity, TrackEntity, ArtistEntity],
  synchronize: false,
  migrationsRun: true,
};
