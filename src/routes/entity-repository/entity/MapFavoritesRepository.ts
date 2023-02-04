import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../interface/FavoritesRepository';
import { FavoritesRepositoryResponse } from '../interface/FavoritesRepositoryResponse';

@Injectable()
export class MapFavoritesRepository implements FavoritesRepository {
  public readonly artists: string[] = [];
  public readonly albums: string[] = [];
  public readonly tracks: string[] = [];

  public async getAll(): Promise<FavoritesRepositoryResponse> {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  public async add(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<string> {
    this[collectionName].push(id);
    return id;
  }

  public async delete(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<boolean> {
    const idx: number = this[collectionName].findIndex((item) => item === id);
    if (idx === -1) return false;
    this[collectionName].splice(idx, 1);
    return true;
  }
}
