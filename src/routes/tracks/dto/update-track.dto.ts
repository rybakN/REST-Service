import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  artistId: string | null;
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  duration: number;
}
