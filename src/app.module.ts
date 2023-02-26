import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TracksModule,
    EntityRepositoryModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
  exports: [EntityRepositoryModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
