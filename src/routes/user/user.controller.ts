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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationBodyPipe } from '../utils/validation-body.pipe';
import { UserEntity } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  public async create(
    @Body(new ValidationBodyPipe()) createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user: UserEntity = await this.usersService.create(createUserDto);
    return this.usersService.deletePassword(user);
  }

  @Get()
  @ApiOkResponse({
    description: 'All users records.',
  })
  public async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users: UserEntity[] = await this.usersService.findAll();
    return users.map((user) => this.usersService.deletePassword(user));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Record with id === userId if it exists' })
  @ApiBadRequestResponse({ description: 'UserId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === userId doesn't exist",
  })
  public async findOne(
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
  @ApiOkResponse({ description: 'Updated record if request is valid' })
  @ApiBadRequestResponse({ description: 'UserId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === userId doesn't exist",
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
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
    return this.usersService.deletePassword(updated);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Record is found and deleted' })
  @ApiBadRequestResponse({ description: 'UserId is invalid (not uuid)' })
  @ApiNotFoundResponse({
    description: "Record with id === userId doesn't exist",
  })
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
