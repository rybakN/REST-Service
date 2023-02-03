import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { EntityRepository } from '../interface/EntityRepository';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';

@Injectable()
export class MapTracksRepository
  implements EntityRepository<TrackEntity, CreateTrackDto, UpdateTrackDto>
{
  tracks: Map<string, TrackEntity> = new Map();

  async getAll(): Promise<TrackEntity[]> {
    const track: TrackEntity[] = [];
    for (const key of this.tracks.keys()) {
      track.push(this.tracks.get(key));
    }
    return track;
  }

  async getOne(id: string): Promise<TrackEntity> {
    const track: TrackEntity | null = this.tracks.get(id);
    if (!track) return null;
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const key: string = uuidV4();
    const track: TrackEntity = {
      ...createTrackDto,
      id: key,
    };
    this.tracks.set(key, track);
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | null> {
    let track: TrackEntity | null = await this.getOne(id);
    if (!track) return null;
    track = { ...track, ...updateTrackDto };
    this.tracks.set(id, track);
    return track;
  }

  async delete(id: string): Promise<void | null> {
    const track: TrackEntity | null = await this.getOne(id);
    if (!track) return null;
    this.tracks.delete(id);
    return;
  }
}
