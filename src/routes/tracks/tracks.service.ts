import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { EntityRepository } from '../entity-repository/interface/EntityRepository';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';
import { MapUsersRepository } from '../entity-repository/entity/MapUsersRepository';
@Injectable()
export class TracksService {
  constructor(
    @Inject(MapTracksRepository)
    private tracks: EntityRepository<
      TrackEntity,
      CreateTrackDto,
      UpdateTrackDto
    >,
    @Inject(MapUsersRepository)
    private usersRepository: EntityRepository<
      UserEntity,
      CreateUserDto,
      UpdateUserDto
    >,
  ) {}
  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    console.log(await this.usersRepository.getAll());
    return await this.tracks.create(createTrackDto);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.tracks.getAll();
  }

  async findOne(id: string) {
    const track: TrackEntity | null = await this.tracks.getOne(id);
    if (!track) return null;
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | null> {
    const track: TrackEntity | null = await this.findOne(id);
    if (!track) return null;
    return await this.tracks.update(id, updateTrackDto);
  }

  async remove(id: string): Promise<void | null> {
    const deleted: TrackEntity | null = await this.tracks.getOne(id);
    if (!deleted) return null;
    return await this.tracks.delete(id);
  }
}
