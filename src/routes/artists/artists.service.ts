import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MapArtistsRepository } from '../entity-repository/entity/MapArtistsRepository';
import { ArtistEntity } from './entities/artist.entity';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artists: MapArtistsRepository,
    private readonly tracks: MapTracksRepository,
    private readonly favorites: MapFavoritesRepository,
  ) {}
  public async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return await this.artists.create(createArtistDto);
  }

  public async findAll(): Promise<ArtistEntity[]> {
    return await this.artists.getAll();
  }

  public async findOne(id: string) {
    const artist: ArtistEntity | null = await this.artists.getOne(id);
    if (!artist) return null;
    return artist;
  }

  public async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity | null> {
    const artist: ArtistEntity | null = await this.findOne(id);
    if (!artist) return null;
    return await this.artists.update(id, updateArtistDto);
  }

  public async remove(id: string): Promise<void | null> {
    const deleted: ArtistEntity | null = await this.artists.getOne(id);
    if (!deleted) return null;
    await this.deleteArtistIdInTracks(id, 'artistId');
    await this.favorites.delete(id, 'artists');
    return await this.artists.delete(id);
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
