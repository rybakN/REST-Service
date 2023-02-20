import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { UserEntity } from './entities/user.entity';
import { UserBodyInterceptor } from '../utils/user-body.interceptor';

@UseInterceptors(UserBodyInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  public async create(
    @Body(new ValidationBodyPipe()) createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user: UserEntity | null = await this.usersService.findOne(id);
    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  @Put(':id')
  public async update(
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
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted: void | null = await this.usersService.remove(id);
    if (deleted === null)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return;
  }
}
