import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  artistId: string | null;
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  albumId: string | null;
  @ApiProperty()
  @IsInt()
  duration: number;
}
