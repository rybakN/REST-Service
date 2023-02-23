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
import { ArtistsService } from './artists.service';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  public async create(
    @Body(new ValidationBodyPipe()) createArtistDto: CreateArtistDto,
  ) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  public async findAll(): Promise<ArtistEntity[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity | null = await this.artistsService.findOne(id);
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const updatedArtist: ArtistEntity | null = await this.artistsService.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist)
      throw new NotFoundException(`Artist with id: ${id} not found`);
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.artistsService.remove(id);
    if (deleted === null)
      throw new NotFoundException(`Artist with id: ${id} not found`);
    return await this.artistsService.remove(id);
  }
}
