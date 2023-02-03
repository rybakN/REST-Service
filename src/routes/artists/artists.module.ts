import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MapArtistsRepository } from '../entity-repository/entity/MapArtistsRepository';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, MapArtistsRepository],
})
export class ArtistsModule {}
