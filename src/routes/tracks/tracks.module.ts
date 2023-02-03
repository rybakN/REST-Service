import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MapTrackRepository } from '../entity-repository/entity/MapTrackRepository';
import { MapUserRepository } from '../entity-repository/entity/MapUserRepository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, MapTrackRepository, MapUserRepository],
})
export class TracksModule {}
