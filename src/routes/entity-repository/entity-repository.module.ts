import { Module } from '@nestjs/common';
import { MapUserRepository } from './entity/MapUserRepository';
import { MapTrackRepository } from './entity/MapTrackRepository';

@Module({
  providers: [MapUserRepository, MapTrackRepository],
  exports: [MapUserRepository, MapTrackRepository],
})
export class EntityRepositoryModule {}
