import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { MapUsersRepository } from '../entity-repository/entity/MapUsersRepository';
import { EntityRepository } from '../entity-repository/interface/EntityRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject(MapUsersRepository)
    private users: EntityRepository<UserEntity, CreateUserDto, UpdateUserDto>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.users.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.users.getAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.users.getOne(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null | boolean> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    if (user.password !== updateUserDto.oldPassword) return false;
    return this.users.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void | null> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    return await this.users.delete(id);
  }

  deletePassword(user: UserEntity): Omit<UserEntity, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
