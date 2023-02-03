import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { EntityRepository } from '../entity-repository/interface/EntityRepository';
import { MapArtistsRepository } from '../entity-repository/entity/MapArtistsRepository';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(MapArtistsRepository)
    private artists: EntityRepository<
      ArtistEntity,
      CreateArtistDto,
      UpdateArtistDto
    >,
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return await this.artists.create(createArtistDto);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artists.getAll();
  }

  async findOne(id: string) {
    const artist: ArtistEntity | null = await this.artists.getOne(id);
    if (!artist) return null;
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity | null> {
    const artist: ArtistEntity | null = await this.findOne(id);
    if (!artist) return null;
    return await this.artists.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<void | null> {
    const deleted: ArtistEntity | null = await this.artists.getOne(id);
    if (!deleted) return null;
    return await this.artists.delete(id);
  }
}
