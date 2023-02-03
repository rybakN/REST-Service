import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'string or null',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @ApiProperty({
    description: 'string or null',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @ApiProperty({
    description: 'integer value',
  })
  @IsInt()
  duration: number;
}
