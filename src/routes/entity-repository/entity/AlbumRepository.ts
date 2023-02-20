import { AbstractEntityRepository } from './AbstractEntityRepository';
import { EntityRepository } from '../interface/EntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';

export class AlbumRepository
  extends AbstractEntityRepository<AlbumEntity, CreateAlbumDto, UpdateAlbumDto>
  implements EntityRepository<AlbumEntity, CreateAlbumDto, UpdateAlbumDto>
{
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepo: Repository<AlbumEntity>,
  ) {
    super(albumRepo);
  }
  public getFavorites(): Promise<AlbumEntity[]> {
    return this.albumRepo.find({ where: { favorite: true } });
  }
}
