import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { MapEntityRepository } from './MapEntityRepository';

@Injectable()
export class MapAlbumsRepository
  extends MapEntityRepository<AlbumEntity, CreateAlbumDto, UpdateAlbumDto>
  implements EntityRepository<AlbumEntity, CreateAlbumDto, UpdateAlbumDto> {}
