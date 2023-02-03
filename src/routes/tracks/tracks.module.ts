import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';
import { MapUsersRepository } from '../entity-repository/entity/MapUsersRepository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, MapTracksRepository, MapUsersRepository],
})
export class TracksModule {}
