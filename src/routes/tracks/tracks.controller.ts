import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { TrackEntity } from './entities/track.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The track has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  public async create(
    @Body(new ValidationBodyPipe()) createTrackDto: CreateTrackDto,
  ) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All tracks records.',
  })
  public async findAll(): Promise<TrackEntity[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Record with id === trackId if it exists' })
  @ApiBadRequestResponse({ description: 'TrackId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
  })
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackEntity> {
    const track: TrackEntity | null = await this.tracksService.findOne(id);
    if (!track)
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated record if request is valid' })
  @ApiBadRequestResponse({ description: 'TrackId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
  })
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack: TrackEntity | null = await this.tracksService.update(
      id,
      updateTrackDto,
    );
    if (!updatedTrack)
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return updatedTrack;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Record is found and deleted' })
  @ApiBadRequestResponse({ description: 'TrackId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.tracksService.remove(id);
    if (deleted === null)
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.tracksService.remove(id);
  }
}
