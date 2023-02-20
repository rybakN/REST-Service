import { AbstractEntityRepository } from './AbstractEntityRepository';
import { EntityRepository } from '../interface/EntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';

export class ArtistRepository
  extends AbstractEntityRepository<
    ArtistEntity,
    CreateArtistDto,
    UpdateArtistDto
  >
  implements EntityRepository<ArtistEntity, CreateArtistDto, UpdateArtistDto>
{
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepo: Repository<ArtistEntity>,
  ) {
    super(artistRepo);
  }
  public getFavorites(): Promise<ArtistEntity[]> {
    return this.artistRepo.find({ where: { favorite: true } });
  }
}
