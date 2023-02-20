import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
import { AlbumRepository } from '../entity-repository/entity/AlbumRepository';
import { TrackRepository } from '../entity-repository/entity/TrackRepository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albums: AlbumRepository,
    private readonly tracks: TrackRepository,
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
    const album: AlbumEntity | null = await this.albums.getOne(id);
    if (!album) return null;
    return album;
  }

  public async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity | null> {
    const album: AlbumEntity | null = await this.findOne(id);
    if (!album) return null;
    return await this.albums.update(id, updateAlbumDto);
  }

  public async remove(id: string): Promise<void | null> {
    const deleted: AlbumEntity | null = await this.albums.getOne(id);
    if (!deleted) return null;
    // await this.deleteArtistIdInTracks(id, 'albumId');
    // await this.favorites.delete(id, 'albums');
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
