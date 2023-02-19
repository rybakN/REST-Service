import { FavoritesRepositoryResponse } from './FavoritesRepositoryResponse';
import { Favorite } from '../../favorites/entities/favorite.entity';

export interface FavoritesRepository {
  add(
    id: string,
    collection: keyof FavoritesRepositoryResponse,
  ): Promise<string>;
  delete(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<boolean>;
  getAll(): Promise<Favorite>;
}
