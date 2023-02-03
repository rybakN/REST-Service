import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Header,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(
    @Body(new ValidationBodyPipe()) createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user: UserEntity = await this.usersService.create(createUserDto);
    return this.usersService.deletePassword(user);
  }

  @Get()
  @Header('content-type', 'application/json')
  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users: UserEntity[] = await this.usersService.findAll();
    return users.map((user) => this.usersService.deletePassword(user));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user: UserEntity | null = await this.usersService.findOne(id);
    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return this.usersService.deletePassword(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationBodyPipe()) updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const updated = await this.usersService.update(id, updateUserDto);
    if (typeof updated === 'boolean')
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    if (!updated)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return this.usersService.deletePassword(updated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.usersService.remove(id);
    if (deleted === null)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return;
  }
}
