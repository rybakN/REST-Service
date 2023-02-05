import { Injectable } from '@nestjs/common';
import { FavoritesRepositoryResponse } from '../entity-repository/interface/FavoritesRepositoryResponse';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
import { Favorite } from './entities/favorite.entity';
import { MapEntityRepository } from '../entity-repository/entity/MapEntityRepository';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';
import { AlbumEntity } from '../albums/entities/album.entity';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { TrackEntity } from '../tracks/entities/track.entity';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepo: MapFavoritesRepository,

    private readonly artists: MapEntityRepository<
      ArtistEntity,
      CreateArtistDto,
      UpdateArtistDto
    >,
    private readonly albums: MapEntityRepository<
      AlbumEntity,
      CreateAlbumDto,
      UpdateAlbumDto
    >,
    private readonly tracks: MapEntityRepository<
      TrackEntity,
      CreateTrackDto,
      UpdateTrackDto
    >,
  ) {}

  async findAll(): Promise<Favorite> {
    const favorites = await this.favoritesRepo.getAll();
    const favoriteResp: Favorite = { artists: [], albums: [], tracks: [] };
    for (const item of favorites.tracks) {
      favoriteResp.tracks.push(await this.tracks.getOne(item));
    }
    for (const item of favorites.albums) {
      favoriteResp.albums.push(await this.albums.getOne(item));
    }
    for (const item of favorites.artists) {
      favoriteResp.artists.push(await this.artists.getOne(item));
    }
    return favoriteResp;
  }

  async addInFav(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<string | null> {
    const entity = await this[collectionName].getOne(id);
    if (!entity) return null;
    return await this.favoritesRepo.add(id, collectionName);
  }

  async removeInFav(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<boolean> {
    return await this.favoritesRepo.delete(id, collectionName);
  }
}
