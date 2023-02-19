import { AbstractEntityRepository } from './AbstractEntityRepository';
import { EntityRepository } from '../interface/EntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
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
}
