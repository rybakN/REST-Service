import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
import { MapEntityRepository } from '../entity-repository/entity/MapEntityRepository';
@Injectable()
export class TracksService {
  constructor(
    private readonly tracks: MapEntityRepository<
      TrackEntity,
      CreateTrackDto,
      UpdateTrackDto
    >,
    private readonly favorites: MapFavoritesRepository,
  ) {}
  public async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    if (createTrackDto.artistId === undefined) createTrackDto.artistId = null;
    if (createTrackDto.albumId === undefined) createTrackDto.albumId = null;
    return await this.tracks.create(createTrackDto);
  }

  public async findAll(): Promise<TrackEntity[]> {
    return await this.tracks.getAll();
  }

  public async findOne(id: string) {
    const track: TrackEntity | null = await this.tracks.getOne(id);
    if (!track) return null;
    return track;
  }

  public async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | null> {
    const track: TrackEntity | null = await this.findOne(id);
    if (!track) return null;
    return await this.tracks.update(id, updateTrackDto);
  }

  public async remove(id: string): Promise<void | null> {
    const deleted: TrackEntity | null = await this.tracks.getOne(id);
    if (!deleted) return null;
    await this.favorites.delete(id, 'tracks');
    return await this.tracks.delete(id);
  }
}
