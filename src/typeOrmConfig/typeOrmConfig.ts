import { UserEntity } from '../routes/user/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AlbumEntity } from '../routes/albums/entities/album.entity';
import { TrackEntity } from '../routes/tracks/entities/track.entity';
import { ArtistEntity } from '../routes/artists/entities/artist.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'postgres',
  entities: [UserEntity, AlbumEntity, TrackEntity, ArtistEntity],
  synchronize: true,
};
