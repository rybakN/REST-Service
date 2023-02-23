import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<{
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
  }> {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  async addArtistInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'artists',
    );
    if (!_id)
      throw new UnprocessableEntityException(
        `Artist with id: ${id} doesn't exist`,
      );
    return [_id];
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delArtistInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'artists',
    );
    if (!response)
      throw new NotFoundException(
        `Artist with id: ${id} not found in favorites`,
      );
    return;
  }

  @Post('/album/:id')
  async addAlbumInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'albums',
    );
    if (!_id)
      throw new UnprocessableEntityException(
        `Album with id: ${id} doesn't exist`,
      );
    return [_id];
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delAlbumInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'albums',
    );
    if (!response)
      throw new NotFoundException(
        `Albums with id: ${id} not found in favorites`,
      );
    return;
  }

  @Post('/track/:id')
  async addTrackInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'tracks',
    );
    if (!_id)
      throw new UnprocessableEntityException(
        `Track with id: ${id} doesn't exist`,
      );
    return [_id];
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delTrackInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'tracks',
    );
    if (!response)
      throw new NotFoundException(
        `Tracks with id: ${id} not found in favorites`,
      );
    return;
  }
}
