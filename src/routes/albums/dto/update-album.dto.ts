import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  name: string;
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiProperty({
    description: 'string or null',
  })
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
