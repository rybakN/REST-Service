import { Injectable } from '@nestjs/common';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { EntityRepository } from '../interface/EntityRepository';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { MapEntityRepository } from './MapEntityRepository';

@Injectable()
export class MapTracksRepository
  extends MapEntityRepository<TrackEntity, CreateTrackDto, UpdateTrackDto>
  implements EntityRepository<TrackEntity, CreateTrackDto, UpdateTrackDto> {}
