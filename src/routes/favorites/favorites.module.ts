import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { EntityRepositoryModule } from '../entity-repository/entity-repository.module';

@Module({
  imports: [EntityRepositoryModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
