import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { MapEntityRepository } from './MapEntityRepository';

@Injectable()
export class MapArtistsRepository
  extends MapEntityRepository<ArtistEntity, CreateArtistDto, UpdateArtistDto>
  implements EntityRepository<ArtistEntity, CreateArtistDto, UpdateArtistDto>
{
  protected entities: Map<string, ArtistEntity> = new Map();
}
