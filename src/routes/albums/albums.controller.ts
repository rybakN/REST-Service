import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  public async create(
    @Body(new ValidationBodyPipe()) createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  public async findAll(): Promise<AlbumEntity[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity | null = await this.albumsService.findOne(id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const updatedAlbum: AlbumEntity | null = await this.albumsService.update(
      id,
      updateAlbumDto,
    );
    if (!updatedAlbum)
      throw new NotFoundException(`Album with id: ${id} not found`);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.albumsService.remove(id);
    if (deleted === null)
      throw new NotFoundException(`Album with id: ${id} not found`);
    return await this.albumsService.remove(id);
  }
}
