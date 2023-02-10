import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { AlbumEntity } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The album has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  public async create(
    @Body(new ValidationBodyPipe()) createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All albums records.',
  })
  public async findAll(): Promise<AlbumEntity[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Record with id === albumId if it exists' })
  @ApiBadRequestResponse({ description: 'AlbumId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === albumId doesn't exist",
  })
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity | null = await this.albumsService.findOne(id);
    if (!album)
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated record if request is valid' })
  @ApiBadRequestResponse({ description: 'AlbumId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === albumId doesn't exist",
  })
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const updatedAlbum: AlbumEntity | null = await this.albumsService.update(
      id,
      updateAlbumDto,
    );
    if (!updatedAlbum)
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return updatedAlbum;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Record is found and deleted' })
  @ApiBadRequestResponse({ description: 'AlbumId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === albumId doesn't exist",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.albumsService.remove(id);
    if (deleted === null)
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.albumsService.remove(id);
  }
}
