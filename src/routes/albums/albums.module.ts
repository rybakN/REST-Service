import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { EntityRepositoryModule } from '../entity-repository/entity-repository.module';

@Module({
  imports: [EntityRepositoryModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
