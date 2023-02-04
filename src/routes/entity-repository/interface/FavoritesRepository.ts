import { FavoritesRepositoryResponse } from './FavoritesRepositoryResponse';

export interface FavoritesRepository {
  add(
    id: string,
    collection: keyof FavoritesRepositoryResponse,
  ): Promise<string>;
  delete(
    id: string,
    collectionName: keyof FavoritesRepositoryResponse,
  ): Promise<boolean>;
  getAll(): Promise<FavoritesRepositoryResponse>;
}
