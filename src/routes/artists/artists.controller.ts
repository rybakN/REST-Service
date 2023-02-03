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
import { ArtistsService } from './artists.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The artist has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(
    @Body(new ValidationBodyPipe()) createArtistDto: CreateArtistDto,
  ) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All artist records.',
  })
  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Record with id === artistId if it exists' })
  @ApiBadRequestResponse({ description: 'ArtistId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === artistId doesn't exist",
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistEntity> {
    const artist: ArtistEntity | null = await this.artistsService.findOne(id);
    if (!artist)
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated record if request is valid' })
  @ApiBadRequestResponse({ description: 'ArtistId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === artistId doesn't exist",
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const updatedArtist: ArtistEntity | null = await this.artistsService.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist)
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return updatedArtist;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Record is found and deleted' })
  @ApiBadRequestResponse({ description: 'ArtistId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === artistId doesn't exist",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.artistsService.remove(id);
    if (deleted === null)
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.artistsService.remove(id);
  }
}
