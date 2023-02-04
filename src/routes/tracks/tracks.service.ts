import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { EntityRepository } from '../entity-repository/interface/EntityRepository';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
@Injectable()
export class TracksService {
  constructor(
    @Inject(MapTracksRepository)
    private readonly tracks: EntityRepository<
      TrackEntity,
      CreateTrackDto,
      UpdateTrackDto
    >,
    @Inject(MapFavoritesRepository)
    private readonly favorites: MapFavoritesRepository,
  ) {}
  public async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
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
