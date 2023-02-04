import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';

@Injectable()
export class MapArtistsRepository
  implements EntityRepository<ArtistEntity, CreateArtistDto, UpdateArtistDto>
{
  private artists: Map<string, ArtistEntity> = new Map();

  public async getAll(): Promise<ArtistEntity[]> {
    const artist: ArtistEntity[] = [];
    for (const key of this.artists.keys()) {
      artist.push(this.artists.get(key));
    }
    return artist;
  }

  public async getOne(id: string): Promise<ArtistEntity> {
    const artist: ArtistEntity | null = this.artists.get(id);
    if (!artist) return null;
    return artist;
  }

  public async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const key: string = uuidV4();
    const artist: ArtistEntity = {
      ...createArtistDto,
      id: key,
    };
    this.artists.set(key, artist);
    return artist;
  }

  public async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity | null> {
    let artist: ArtistEntity | null = await this.getOne(id);
    if (!artist) return null;
    artist = { ...artist, ...updateArtistDto };
    this.artists.set(id, artist);
    return artist;
  }

  public async delete(id: string): Promise<void | null> {
    const artist: ArtistEntity | null = await this.getOne(id);
    if (!artist) return null;
    this.artists.delete(id);
    return;
  }
}
