import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../interface/FavoritesRepository';
import { FavoritesRepositoryResponse } from '../interface/FavoritesRepositoryResponse';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { AlbumRepository } from './AlbumRepository';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { ArtistRepository } from './ArtistRepository';
import { TrackRepository } from './TrackRepository';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';

@Injectable()
export class MapFavoritesRepository implements FavoritesRepository {
  constructor(
    private albums: AlbumRepository,
    private artists: ArtistRepository,
    private tracks: TrackRepository,
  ) {}

  public async getAll(): Promise<Favorite> {
    const albumsFav: AlbumEntity[] = await this.albums.getFavorites();
    const artistsFav: ArtistEntity[] = await this.artists.getFavorites();
    const tracksFav: TrackEntity[] = await this.tracks.getFavorites();
    return {
      artists: artistsFav,
      albums: albumsFav,
      tracks: tracksFav,
    };
  }

  public async add(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<string> {
    await this[collectionName].update(id, { favorite: true });
    return id;
  }

  public async delete(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<boolean> {
    await this[collectionName].update(id, { favorite: false });
    return true;
  }
}
