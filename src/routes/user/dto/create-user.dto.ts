import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;
  @ApiProperty()
  @IsString()
  password: string;
}
