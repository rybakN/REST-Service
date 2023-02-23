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
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  public async create(
    @Body(new ValidationBodyPipe()) createTrackDto: CreateTrackDto,
  ) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  public async findAll(): Promise<TrackEntity[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackEntity> {
    const track: TrackEntity | null = await this.tracksService.findOne(id);
    if (!track) throw new NotFoundException(`Track with id: ${id} not found`);
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack: TrackEntity | null = await this.tracksService.update(
      id,
      updateTrackDto,
    );
    if (!updatedTrack)
      throw new NotFoundException(`Track with id: ${id} not found`);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.tracksService.remove(id);
    if (deleted === null)
      throw new NotFoundException(`Track with id: ${id} not found`);
    return await this.tracksService.remove(id);
  }
}
