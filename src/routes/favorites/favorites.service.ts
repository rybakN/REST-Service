import { Inject, Injectable } from '@nestjs/common';
import { FavoritesRepositoryResponse } from '../entity-repository/interface/FavoritesRepositoryResponse';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
import { Favorite } from './entities/favorite.entity';
import { MapArtistsRepository } from '../entity-repository/entity/MapArtistsRepository';
import { MapAlbumsRepository } from '../entity-repository/entity/MapAlbumsRepository';
import { MapTracksRepository } from '../entity-repository/entity/MapTracksRepository';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(MapFavoritesRepository)
    private readonly favoritesRepo: MapFavoritesRepository,

    @Inject(MapArtistsRepository)
    private readonly artists: MapArtistsRepository,
    @Inject(MapAlbumsRepository)
    private readonly albums: MapAlbumsRepository,
    @Inject(MapTracksRepository)
    private readonly tracks: MapTracksRepository,
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
