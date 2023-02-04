import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';

@Injectable()
export class MapAlbumsRepository
  implements EntityRepository<AlbumEntity, CreateAlbumDto, UpdateAlbumDto>
{
  private albums: Map<string, AlbumEntity> = new Map();

  public async getAll(): Promise<AlbumEntity[]> {
    const albums: AlbumEntity[] = [];
    for (const key of this.albums.keys()) {
      albums.push(this.albums.get(key));
    }
    return albums;
  }

  public async getOne(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity | null = this.albums.get(id);
    if (!album) return null;
    return album;
  }

  public async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const key: string = uuidV4();
    const album: AlbumEntity = {
      ...createAlbumDto,
      id: key,
    };
    this.albums.set(key, album);
    return album;
  }

  public async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity | null> {
    let album: AlbumEntity | null = await this.getOne(id);
    if (!album) return null;
    album = { ...album, ...updateAlbumDto };
    this.albums.set(id, album);
    return album;
  }

  public async delete(id: string): Promise<void | null> {
    const album: AlbumEntity | null = await this.getOne(id);
    if (!album) return null;
    this.albums.delete(id);
    return;
  }
}
