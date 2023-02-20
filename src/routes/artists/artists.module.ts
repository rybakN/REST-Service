import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { EntityRepositoryModule } from '../entity-repository/entity-repository.module';

@Module({
  imports: [EntityRepositoryModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
