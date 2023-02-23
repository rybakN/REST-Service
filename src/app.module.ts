import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { EntityRepositoryModule } from './routes/entity-repository/entity-repository.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './typeOrmConfig/typeOrmConfig';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exception-filter/all-exception.filter';

@Module({
  imports: [
    UserModule,
    TracksModule,
    EntityRepositoryModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
  exports: [EntityRepositoryModule],
})
export class AppModule {}
