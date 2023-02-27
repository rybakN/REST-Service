import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @IsInt()
  duration: number;
}
