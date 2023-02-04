import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({
    description: 'All favorites records.',
  })
  @Get()
  async findAll(): Promise<{
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
  }> {
    return this.favoritesService.findAll();
  }

  @ApiCreatedResponse({
    description: 'Record add to favorites',
  })
  @ApiBadRequestResponse({ description: 'ArtistId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({
    description: "Record with id === ArtistId doesn't exist",
  })
  @Post('/artist/:id')
  async addArtistInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'artists',
    );
    if (!_id)
      throw new HttpException(
        `Artist with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return [_id];
  }

  @ApiNoContentResponse({
    description: 'Record found and deleted',
  })
  @ApiBadRequestResponse({ description: 'ArtistId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === ArtistId doesn't is not favorite",
  })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delArtistInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'artists',
    );
    if (!response)
      throw new HttpException(
        `Artist with id: ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    return;
  }

  @ApiCreatedResponse({
    description: 'Record add to favorites',
  })
  @ApiBadRequestResponse({ description: 'AlbumId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({
    description: "Record with id === AlbumId doesn't exist",
  })
  @Post('/album/:id')
  async addAlbumInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'albums',
    );
    if (!_id)
      throw new HttpException(
        `Album with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return [_id];
  }

  @ApiNoContentResponse({
    description: 'Record found and deleted',
  })
  @ApiBadRequestResponse({ description: 'AlbumId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === AlbumId doesn't is not favorite",
  })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delAlbumInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'albums',
    );
    if (!response)
      throw new HttpException(
        `Albums with id: ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    return;
  }

  @ApiCreatedResponse({
    description: 'Record add to favorites',
  })
  @ApiBadRequestResponse({ description: 'TrackId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({
    description: "Record with id === TrackId doesn't exist",
  })
  @Post('/track/:id')
  async addTrackInFav(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string[]> {
    const _id: string | null = await this.favoritesService.addInFav(
      id,
      'tracks',
    );
    if (!_id)
      throw new HttpException(
        `Track with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return [_id];
  }

  @ApiNoContentResponse({
    description: 'Record found and deleted',
  })
  @ApiBadRequestResponse({ description: 'TrackId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === TrackId doesn't is not favorite",
  })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delTrackInFav(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response: boolean = await this.favoritesService.removeInFav(
      id,
      'tracks',
    );
    if (!response)
      throw new HttpException(
        `Tracks with id: ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    return;
  }
}
