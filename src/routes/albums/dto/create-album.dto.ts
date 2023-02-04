import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
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
