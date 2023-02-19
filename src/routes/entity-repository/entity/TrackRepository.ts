import { AbstractEntityRepository } from './AbstractEntityRepository';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { EntityRepository } from '../interface/EntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TrackRepository
  extends AbstractEntityRepository<TrackEntity, CreateTrackDto, UpdateTrackDto>
  implements EntityRepository<TrackEntity, CreateTrackDto, UpdateTrackDto>
{
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepo: Repository<TrackEntity>,
  ) {
    super(trackRepo);
  }
}
