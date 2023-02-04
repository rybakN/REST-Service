import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiProperty({
    description: 'string or null',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
