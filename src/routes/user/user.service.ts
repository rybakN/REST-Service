import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { MapUsersRepository } from '../entity-repository/entity/MapUsersRepository';

@Injectable()
export class UserService {
  constructor(private readonly users: MapUsersRepository) {}
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.users.create(createUserDto);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.users.getAll();
  }

  public async findOne(id: string): Promise<UserEntity> {
    return await this.users.getOne(id);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null | boolean> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    if (user.password !== updateUserDto.oldPassword) return false;
    return this.users.update(id, updateUserDto);
  }

  public async remove(id: string): Promise<void | null> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    return await this.users.delete(id);
  }

  public deletePassword(user: UserEntity): Omit<UserEntity, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
