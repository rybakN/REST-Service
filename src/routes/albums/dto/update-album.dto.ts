import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  year?: number;
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId?: string | null;
  favorite?: boolean;
}
