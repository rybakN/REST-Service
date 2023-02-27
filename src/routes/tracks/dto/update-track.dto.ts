import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId?: string | null;
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId?: string | null;
  @IsOptional()
  @IsInt()
  duration?: number;
  favorite?: boolean;
}
