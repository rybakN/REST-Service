import { Injectable } from '@nestjs/common';
import { FavoritesRepositoryResponse } from '../entity-repository/interface/FavoritesRepositoryResponse';
import { MapFavoritesRepository } from '../entity-repository/entity/MapFavoritesRepository';
import { Favorite } from './entities/favorite.entity';
import { ArtistRepository } from '../entity-repository/entity/ArtistRepository';
import { AlbumRepository } from '../entity-repository/entity/AlbumRepository';
import { TrackRepository } from '../entity-repository/entity/TrackRepository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepo: MapFavoritesRepository,

    private artists: ArtistRepository,
    private albums: AlbumRepository,
    private tracks: TrackRepository,
  ) {}

  async findAll(): Promise<Favorite> {
    return await this.favoritesRepo.getAll();
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
