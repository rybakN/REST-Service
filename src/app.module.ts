import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { EntityRepositoryModule } from './routes/entity-repository/entity-repository.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TracksModule,
    EntityRepositoryModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [EntityRepositoryModule],
})
export class AppModule {}
