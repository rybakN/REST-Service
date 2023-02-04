import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { MapAlbumsRepository } from '../entity-repository/entity/MapAlbumsRepository';
import { EntityRepository } from '../entity-repository/interface/EntityRepository';
import { AlbumEntity } from './entities/album.entity';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';
import { TrackEntity } from '../tracks/entities/track.entity';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(MapAlbumsRepository)
    private readonly albums: EntityRepository<
      AlbumEntity,
      CreateAlbumDto,
      UpdateAlbumDto
    >,
    @Inject(MapTracksRepository)
    private readonly tracks: EntityRepository<
      TrackEntity,
      CreateTrackDto,
      UpdateTrackDto
    >,
    @Inject(MapFavoritesRepository)
    private readonly favorites: MapFavoritesRepository,
  ) {}
  public async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    if (createAlbumDto.artistId === undefined) createAlbumDto.artistId = null;
    return await this.albums.create(createAlbumDto);
  }

  public async findAll(): Promise<AlbumEntity[]> {
    return await this.albums.getAll();
  }

  public async findOne(id: string) {
    const artist: AlbumEntity | null = await this.albums.getOne(id);
    if (!artist) return null;
    return artist;
  }
  // #Todo
  public async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity | null> {
    const artist: AlbumEntity | null = await this.findOne(id);
    if (!artist) return null;
    return await this.albums.update(id, updateAlbumDto);
  }

  public async remove(id: string): Promise<void | null> {
    const deleted: AlbumEntity | null = await this.albums.getOne(id);
    if (!deleted) return null;
    await this.deleteArtistIdInTracks(id, 'albumId');
    await this.favorites.delete(id, 'albums');
    return await this.albums.delete(id);
  }

  private async deleteArtistIdInTracks(id: string, key: string): Promise<void> {
    const tracks: TrackEntity[] = await this.tracks.getAll();
    const filteredTracks: TrackEntity[] = tracks.filter(
      (track) => track[key] === id,
    );
    for (const track of filteredTracks) {
      const updateTrackDto: UpdateTrackDto = {
        ...track,
        [key]: null,
      };
      await this.tracks.update(track.id, updateTrackDto);
    }
    return;
  }
}
